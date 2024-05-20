import { render, screen } from '@testing-library/react';
import Card from './index';
import userEvent from '@testing-library/user-event';

const item = {
  id: '123',
  name: 'Vanilla',
  imagePath: '/images/vanilla.png',
};

test('Miktar, başlık ve fotoğraf gelen propa göre ekrana basılır', () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // miktar spanını çağır
  const amount = screen.getByTestId('amount');

  // miktar spanı 5 mi kontrol et
  expect(amount.textContent).toBe('5');

  // vanilla yazısı ekrana geldi mi kontrol et

  screen.getByText('Vanilla');

  // resmi al
  const image = screen.getByAltText('çeşit-resim');

  // src değeri gönderilen propa göre mi kontrol et
  expect(image).toHaveAttribute('src', '/images/vanilla.png');
});

test('Butonlara tıklanınca fonksiyonlar doğru parametrelerle çağrılır', async () => {
  const user = userEvent.setup();

  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();

  render(
    <Card
      item={item}
      amount={0}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  // butonları al
  const addBtn = screen.getByRole('button', { name: /ekle/i });
  const clearBtn = screen.getByRole('button', { name: /sıfırla/i });

  // ekle butonuna tıkla
  await user.click(addBtn);

  // addToBasket fonksiyonu doğru parametleri alarak çalıştı mı?
  expect(addMockFn).toHaveBeenCalledWith(item);

  // sıfırla butonuna tıkla
  await user.click(clearBtn);

  // clearFromBasket fonksiyonu doğru parametreleri alarak çalıştı mı?
  expect(clearMockFn).toHaveBeenCalledWith(item.id);
});