use cosmwasm_std::{
    entry_point, from_json, to_json_binary, Binary, Coin, Deps, DepsMut, Env,
    IbcBasicResponse, IbcDestinationCallbackMsg, MessageInfo, Response, StdResult, Uint128,
};
use serde::Deserialize;

use crate::error::ContractError;
use crate::msg::{CountResponse, ExecuteMsg, InstantiateMsg, LastTransferResponse, QueryMsg};
use crate::state::{LastTransfer, COUNT, LAST_TRANSFER};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    COUNT.save(deps.storage, &0u64)?;
    Ok(Response::new().add_attribute("action", "instantiate"))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Reset {} => {
            COUNT.save(deps.storage, &0u64)?;
            LAST_TRANSFER.remove(deps.storage);
            Ok(Response::new().add_attribute("action", "reset"))
        }
    }
}

// The callbacks middleware invokes this as a dedicated wasm export (not via
// `sudo`) on the destination chain. The exported symbol must be literally
// `ibc_destination_callback` — that's what the `#[entry_point]` macro emits.
#[entry_point]
pub fn ibc_destination_callback(
    deps: DepsMut,
    _env: Env,
    cb: IbcDestinationCallbackMsg,
) -> Result<IbcBasicResponse, ContractError> {
    // Destination callback fires for any packet (success or failure). ICS-20
    // tokens only land on a successful ack, so bail otherwise — the counter
    // should only move when the user actually received the transfer.
    let ack: Ics20Ack =
        from_json(&cb.ack.data).map_err(|_| ContractError::NotATransfer)?;
    if ack.result.is_none() || ack.error.is_some() {
        return Err(ContractError::NotATransfer);
    }

    let pkt: FungibleTokenPacketData =
        from_json(&cb.packet.data).map_err(|_| ContractError::NotATransfer)?;
    let amount: Uint128 = pkt
        .amount
        .parse()
        .map_err(|_| ContractError::NotATransfer)?;
    if amount.is_zero() {
        return Err(ContractError::EmptyFunds);
    }

    let bump_by = extract_bump_by(&pkt.memo).unwrap_or(1);
    let new_count = COUNT.update(deps.storage, |c| -> StdResult<_> { Ok(c + bump_by) })?;

    let receiver = deps.api.addr_validate(&pkt.receiver)?;
    let funds = vec![Coin { denom: pkt.denom.clone(), amount }];
    let amount_str = format!("{}{}", amount, pkt.denom);

    LAST_TRANSFER.save(
        deps.storage,
        &LastTransfer {
            sender: pkt.sender.clone(),
            receiver: receiver.clone(),
            funds,
        },
    )?;

    Ok(IbcBasicResponse::new()
        .add_attribute("action", "ibc_destination_callback")
        .add_attribute("count", new_count.to_string())
        .add_attribute("bump_by", bump_by.to_string())
        .add_attribute("sender", pkt.sender)
        .add_attribute("receiver", receiver.to_string())
        .add_attribute("amount", amount_str))
}

// ICS-20 v1 FungibleTokenPacketData. Plain serde derives so unknown sibling
// keys (e.g. `memo` on older chains) are ignored.
#[derive(Deserialize)]
struct FungibleTokenPacketData {
    denom: String,
    amount: String,
    sender: String,
    receiver: String,
    #[serde(default)]
    memo: String,
}

// ICS-20 success acks serialize as {"result":"AQ=="}; failures as
// {"error":"..."}. Either field may be present, so accept both and decide.
#[derive(Deserialize)]
struct Ics20Ack {
    #[serde(default)]
    result: Option<String>,
    #[serde(default)]
    error: Option<String>,
}

#[derive(Deserialize)]
struct CallbackMemo {
    #[serde(default)]
    counter: Option<CounterPayload>,
}

#[derive(Deserialize)]
struct CounterPayload {
    bump_by: u64,
}

fn extract_bump_by(memo: &str) -> Option<u64> {
    if memo.is_empty() {
        return None;
    }
    let parsed: CallbackMemo = from_json(memo.as_bytes()).ok()?;
    parsed.counter.map(|c| c.bump_by)
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Count {} => to_json_binary(&CountResponse {
            count: COUNT.load(deps.storage)?,
        }),
        QueryMsg::LastTransfer {} => to_json_binary(&LastTransferResponse {
            last_transfer: LAST_TRANSFER.may_load(deps.storage)?,
        }),
    }
}
