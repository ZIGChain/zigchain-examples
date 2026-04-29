use cosmwasm_schema::{cw_serde, QueryResponses};

use crate::state::LastTransfer;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    Reset {},
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(CountResponse)]
    Count {},
    #[returns(LastTransferResponse)]
    LastTransfer {},
}

#[cw_serde]
pub struct CountResponse {
    pub count: u64,
}

#[cw_serde]
pub struct LastTransferResponse {
    pub last_transfer: Option<LastTransfer>,
}
