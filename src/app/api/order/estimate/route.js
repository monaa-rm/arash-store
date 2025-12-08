import { NextResponse } from "next/server";

// /pages/api/tipax/estimate.js
export async function POST(req) {
  const { destinationCityId, weight, insuranceValue } = await req.json();
  //   const { originCityId, destinationCityId, weight, insuranceValue } = [
  //     174, 500, 10, 1200000,
  //   ];
  const url = new URL(req.url);
  // const selectedCity = url.searchParams.get("selectedCity");
  // const sendCost = url.searchParams.get("sendCost");
  // const originCityId = 1262;
  // const destinationCityId = 2339;
  // const weight = 10;

  // const insuranceValue = 1200000;
  // const customerId = 1154795;
  if (!destinationCityId || !insuranceValue || !weight) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // ۱. گرفتن توکن
    const weightToKg = weight / 1000;
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
    // console.log({ token });
    if (!token) {
      console.log("token not found");
      return NextResponse.json(
        { error: "Failed to get token from Tipax" },
        { status: 500 }
      );
    }

    // ۲. براورد هزینه

    // if (!selectedCity) {
    //   const cities = await fetch(
    //     "https://omtestapi.tipax.ir/api/OM/v3/Cities/plusstate",
    //     {
    //       //     method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   const citidata = await cities.json();
    //   console.log({ citidata: citidata });
    //   return NextResponse.json({ citidata: citidata }, { status: 200 });
    // } else {
    /////////////hazine
    const originCity = await fetch(
      `https://omtestapi.tipax.ir/api/OM/v3/Cities?title=لاهیجان`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const oroginCityData = await originCity.json();
console.log(            {
              origin: {
                cityId: oroginCityData[0]?.id,
                // cityId: 1805,
                cityType: 1,
              },
              destination: {
                cityId: +destinationCityId,
                // cityId: 1262,
                cityType: 1,
              },
              weight: weightToKg,
              packageValue: +insuranceValue * 10,
              // length: 200,
              // width: 100,
              // height: 600,
              packingId: 0,
              packageContentId: 4,
              packType: 20, //کارتن کوچک
              paymentType: 10, //پرداخت فرستنده
              pickupType: 10, //تحویل در نمایندگی-پیش فرض
              distributionType: 10, // تحویل درب به درب
              serviceId: 1, //سرویس زمینی عادی
            })
    const estimateRes = await fetch(
      "https://omtestapi.tipax.ir/api/OM/v3/Pricing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          packageInputs: [
            {
              origin: {
                cityId: oroginCityData[0]?.id,
                // cityId: 1805,
                cityType: 1,
              },
              destination: {
                cityId: +destinationCityId,
                // cityId: 1262,
                cityType: 1,
              },
              weight: weightToKg,
              packageValue: +insuranceValue * 10,
              // length: 200,
              // width: 100,
              // height: 600,
              packingId: 0,
              packageContentId: 4,
              packType: 20, //کارتن کوچک
              paymentType: 10, //پرداخت فرستنده
              pickupType: 10, //تحویل در نمایندگی-پیش فرض
              distributionType: 10, // تحویل درب به درب
              serviceId: 1, //سرویس زمینی عادی
            },
          ],
          discountCode: "string",
        }),
      }
    );
    if (!estimateRes.ok) {
      const err = await estimateRes.text();
      console.log("pricing api err", estimateRes.status, err);
      return NextResponse.json({ error: err }, { status: 400 });
    }
    const estimateData = await estimateRes.json();
    console.log({ result: estimateData[0]?.regularRate });

    return NextResponse.json(
      { data: estimateData[0]?.regularRate },
      { status: 200 }
    );
    // }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
