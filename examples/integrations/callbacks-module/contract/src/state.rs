use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin};
use cw_storage_plus::Item;

#[cw_serde]
pub struct LastTransfer {
    pub sender: String,
    pub receiver: Addr,
    pub funds: Vec<Coin>,
}

pub const COUNT: Item<u64> = Item::new("count");
pub const LAST_TRANSFER: Item<LastTransfer> = Item::new("last_transfer");
