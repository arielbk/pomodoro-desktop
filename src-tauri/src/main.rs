#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{SystemTray, SystemTrayMenu, CustomMenuItem, AppHandle, SystemTrayEvent, Manager, SystemTrayMenuItem};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn set_time(time: &str, app_handle: tauri::AppHandle) {
    let time_menu_item = app_handle.tray_handle().get_item("time");
    time_menu_item.set_title(time);
    time_menu_item.set_enabled(false); 
}

fn make_tray() -> SystemTray {
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("time".to_string(), "Time"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("toggle".to_string(), "Hide"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
    return SystemTray::new().with_menu(menu);
}

fn handle_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    if let SystemTrayEvent::MenuItemClick { id, .. } = event {
        if id.as_str() == "toggle" {
            let window = app.get_window("main").unwrap();
            let menu_item = app.tray_handle().get_item("toggle");
            match window.is_visible() {
                Ok(true) => {
                  window.hide().unwrap();
                  menu_item.set_title("Show").unwrap();
                },
                Ok(false) => {
                  window.show().unwrap();
                  menu_item.set_title("Hide").unwrap();

                },
                Err(_e) => unimplemented!("some kind of error!?"),
            }
        } 
        if id.as_str() == "quit" {
            app.exit(0);
        }
    }
}

fn main() {
    tauri::Builder::default()
    .system_tray(make_tray())
    .on_system_tray_event(handle_tray_event)
    .invoke_handler(tauri::generate_handler![set_time])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
