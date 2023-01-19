class OrdersService {
  static checkWrongStatus(status: number): boolean {
    return status === 0 || status === 5 || status === 4;
  }
  static checkAchievedStatus(status: number): boolean {
    return status === 2;
  }
}

export default OrdersService;
