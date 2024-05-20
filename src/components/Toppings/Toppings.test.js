import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toppings from ".";

test("sosları ekleme ve çıkarma işlemlerinin toplam fiyata olan etkisi", async () => {
  const user = userEvent.setup();

  // bileşeni renderla
  render(<Toppings />);

  // toplam spanı al
  const total = screen.getByTestId("total");

  // bütün sos checkboxlarını al
  const toppings = await screen.findAllByRole("checkbox");

  // toplam alanı 0 mı kontrol et
  expect(total.textContent).toBe("0");

  // bütün checkbox'ların tiklenmediğini kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());

  // checkboxlardan birini tikle
  await user.click(toppings[0]);

  // toplam alanı 3 mü kontrol et
  expect(total.textContent).toBe("3");

  // checkboxlardan birini tikle
  await user.click(toppings[4]);

  // toplam alanı 6 mü kontrol et
  expect(total.textContent).toBe("6");

  // tiklenenlerden birini kaldır
  await user.click(toppings[4]);

  // toplam alanı 3 mü kontrol et
  expect(total.textContent).toBe("3");

  // tiklenenlerden diğerini kaldır
  await user.click(toppings[0]);

  // toplam alanı 0 mü kontrol et
  expect(total.textContent).toBe("0");
});
