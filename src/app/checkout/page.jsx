import ChackoutPage from "@/components/orders/checkout-page";
export const metadata = {
  title: "تسویه حساب | فروشگاه آرش",
  description: "نهایی کردن خرید و وارد کردن اطلاعات پرداخت",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
  },
  robots: {
    index: false,
    follow: false,
  },
};
const Chackout = async () => {
  let citidata = [];
  try {
    console.log("start")
    const loginRes = await fetch(
      "https://omtestapi.tipax.ir/api/OM/v3/Account/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: process.env.TIPAX_USERNAME,
          password: process.env.TIPAX_PASSWORD,
          apiKey: process.env.TIPAX_API,
        }),
      }
    );
    const loginData = await loginRes.json();
    const token = loginData?.accessToken;
    console.log({ token });
    if (!token) {
      throw new Error("توکن یافت نشد");
    }

    const cities = await fetch(
      "https://omtestapi.tipax.ir/api/OM/v3/Cities/plusstate",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log({ cities });
    citidata = await cities.json();
  } catch (error) {
    throw new Error("خطا در اتصال به سرور برای گرفتن شهر ها");
  }

  return <ChackoutPage snapCitites={JSON.parse(JSON.stringify(citidata))} />;
};

export default Chackout;
