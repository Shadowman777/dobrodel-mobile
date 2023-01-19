import {Dispatch} from 'redux';

import {Cart, Product} from 'types/shop/shopTypes';
import {addToCart} from 'store/slices/shopSlice/shopThunks';

import AnalyticsService from 'services/AnalyticsService';

class CartService {
  static checkProductInCart(cart: Cart | null, product: Product): boolean {
    if (cart && cart.basket?.length > 0) {
      return (
        cart.basket?.filter(item => item.product_info.id === product.id)
          .length > 0
      );
    }

    return false;
  }

  static findProductQuantity(cart: Cart | null, product: Product): number {
    if (cart && cart.basket?.length > 0) {
      const filteredCart = cart.basket?.filter(
        item => item.product_info.id === product.id,
      );
      if (filteredCart?.length > 0) {
        return +filteredCart[0].quantity;
      }
    }

    return 0;
  }

  static findProductPrice(cart: Cart | null, product: Product): number {
    if (cart && cart.basket?.length > 0) {
      const filteredCart = cart.basket?.filter(
        item => item.product_info.id === product.id,
      );
      if (filteredCart.length > 0) {
        return filteredCart[0].total_amount;
      }
    }

    return product.price * +product.quantity;
  }

  static getProductsQuantityInCart(cart: Cart | null): number | null {
    if (cart && cart.basket?.length > 0) {
      return cart.basket?.length;
    }
    return null;
  }

  public static getAverageCartPrice(cart: Cart | null): string {
    if (cart && cart.basket?.length > 0) {
      return cart.basket
        ?.reduce((acc, item) => {
          return acc + item.total_amount_average_market;
        }, 0)
        .toFixed(2);
    }
    return '0';
  }

  static getSavingCartPrice(cart: Cart | null): string {
    if (cart && cart.basket?.length > 0) {
      if (cart.total_amount !== null) {
        return (+this.getAverageCartPrice(cart) - cart.total_amount).toFixed(2);
      }
    }
    return '0';
  }

  static addInCart(
    type: 'minus' | 'plus',
    cart: Cart | null,
    product: Product,
    dispatch: Dispatch<any>,
  ): void {
    let payload: {
      id_product: number;
      quantity: number;
    };

    if (type === 'plus') {
      payload = {
        id_product: product.id,
        quantity: +this.findProductQuantity(cart, product) + +product.quantity,
      };
      AnalyticsService.trackEvent('add_product_to_cart', {
        productName: product.name,
      }).then();
    } else {
      payload = {
        id_product: product.id,
        quantity: +this.findProductQuantity(cart, product) - +product.quantity,
      };
      AnalyticsService.trackEvent('remove_product_from_cart', {
        productName: product.name,
      }).then();
    }

    dispatch(addToCart(payload));
  }
}

export default CartService;
