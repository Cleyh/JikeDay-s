// 定义模块的状态类型
export interface AuthState {
    isLoggedIn: boolean;
}

export interface RealTimeState {
    messages: any[]; // 根据实际应用调整类型
}
