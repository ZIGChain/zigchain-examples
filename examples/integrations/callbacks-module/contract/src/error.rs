use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("destination callback received without a transfer payload")]
    NotATransfer,

    #[error("destination callback received with empty funds")]
    EmptyFunds,
}
