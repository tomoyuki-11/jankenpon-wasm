use getrandom::getrandom;
use serde::Serialize;
use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
pub struct JankenResult {
    pub computer_hand: String,
    pub result: String,
}

#[wasm_bindgen]
pub fn janken(user_hand: &str) -> JsValue {
    let hands = ["✊", "✌️", "🖐️"];

    let mut buf = [0u8; 1];
    getrandom(&mut buf).expect("ランダム生成に失敗");
    let computer_index = (buf[0] as usize) % 3;
    let computer_hand = hands[computer_index];

    let result = match (user_hand, computer_hand) {
        (u, c) if u == c => "あいこ!!",
        ("✊", "✌️") | ("✌️", "🖐️") | ("🖐️", "✊") => "勝ち🎉🎉",
        ("✊", "🖐️") | ("✌️", "✊") | ("🖐️", "✌️") => "負け😭",
        _ => "入力が無効です",
    };

    let response = JankenResult {
        computer_hand: computer_hand.to_string(),
        result: result.to_string(),
    };

    to_value(&response).unwrap()
}
