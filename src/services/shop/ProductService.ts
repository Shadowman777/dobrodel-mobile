class ProductService {
  static formatProductPrice(price: string): string {
    if (price.includes('.')) {
      const splittedPrice = price.split('.');
      if (splittedPrice[1].length === 1) {
        return `${this.pasteSpacesToPrice(splittedPrice[0])},${
          splittedPrice[1]
        }0`;
      }

      return `${this.pasteSpacesToPrice(splittedPrice[0])},${splittedPrice[1]}`;
    }

    return `${this.pasteSpacesToPrice(price)},00`;
  }

  public static pasteSpacesToPrice(price: string): string {
    if (price.length > 3) {
      let tempStr = price.split('').reverse().join('');
      tempStr = tempStr.replace(/(.{3})/g, '$1 ');
      tempStr = tempStr.split('').reverse().join('');

      return tempStr;
    }

    return price;
  }
}

export default ProductService;
