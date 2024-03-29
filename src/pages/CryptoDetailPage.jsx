import { SymbolOverview } from "react-tradingview-embed";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import ControlledAccordions from "../Components/Accordion";
import { cryptoContext } from "../Context/CryptoContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertToInternationalCurrencySystem } from "../Utils/Utils";

function CryptoDetail() {
  // **** useContext()

  // Get  price currency (rls) for any currency from Context
  const { getCryptoDataFromApiForHomePageTable } = useContext(cryptoContext);

  // *****  useState()
  const [storePriceFromIRTInput, setStorePriceFromIRTInput] = useState("");
  const [storePriceFromCryptoInput, setStorePriceFromCryptoInput] = useState("");
  const [cryptoDetailFromApi, setCryptoDetailFromApi] = useState();

  //  *****   useEffect()
  // Request to api for get data of any currency ==>  for get usd price
  useEffect(() => {
    const getUSDCryptoDetailFromApi = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${usdId}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        setCryptoDetailFromApi(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUSDCryptoDetailFromApi();
  }, []);

  // Get USD and RLS from URL
  const { usdId, rlsId } = useParams();

  return (
    <section>
      <div className=' h-96 bg-zinc-800'></div>

      <div className='bg-gray-100'>
        {/* Start ==> container div */}
        <div className='w-3/4 h-full mx-auto '>
          {/* Start ==> First div */}
          <div className='-translate-y-64'>
            {/* Statr ==> cryptocurrency price ==> first row*/}
            <div className='flex justify-between mb-4 h-44'>
              <div className='flex items-end pb-5'>
                <div className='w-24 ml-5 bg-gray-200 rounded-full h-24 flex items-center justify-center'>
                  <img src={cryptoDetailFromApi && cryptoDetailFromApi.image.large} className='w-16 h-16' />
                </div>
                <div className='flex flex-col'>
                  <div>
                    <span className='mr-2 text-xl text-gray-500'>{cryptoDetailFromApi && cryptoDetailFromApi.symbol.toUpperCase()}</span>
                    <span className='text-2xl font-bold text-white'>{cryptoDetailFromApi && cryptoDetailFromApi.name.toUpperCase()}</span>
                  </div>
                  <div className='mt-4 text-4xl font-bold text-white'>{cryptoDetailFromApi && cryptoDetailFromApi.localization.ar}</div>
                </div>
              </div>
              <div className='flex flex-col items-end text-white '>
                <button className='px-6 py-1 mb-10 rounded bg-violet-500'>معامله حرفه&zwnj;ای</button>
                <p className='mb-3 text-2xl dir-left'>
                  <span className='text-white'>
                    <span className='text-lg text-gray-400'>USDT</span>&nbsp;
                    {cryptoDetailFromApi && cryptoDetailFromApi.market_data.current_price.usd.toLocaleString()}
                  </span>
                  <span className='text-white'>{}</span>
                </p>
                <div className='flex items-center'>
                  <span
                    className={`px-6 py-1 text-xl rounded-full dir-left ${
                      getCryptoDataFromApiForHomePageTable[0] && Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].dayChange) > 0
                        ? "bg-teal-400 "
                        : "bg-red-400"
                    }`}>
                    {getCryptoDataFromApiForHomePageTable[0] && Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].dayChange)} %
                  </span>
                  <span className='mr-5 text-4xl font-bold tracking-wides'>
                    {getCryptoDataFromApiForHomePageTable[0] &&
                      Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].bestBuy).toLocaleString()}
                  </span>
                  <span className='mr-2 text-3xl text-gray-400'>تومان</span>
                </div>
              </div>
            </div>
            {/* End ==> cryptocurrency price ==> first row*/}

            {/* Start ==> second row */}
            <div className='flex h-[430px]'>
              {/* Start ==> Global market information ==> right div */}
              <div className='flex-col flex-[2_2_0%] h-[430px] flex text-gray-400'>
                <div className='flex flex-col px-16 py-12 mb-4 bg-white border rounded-md border-neutral-200'>
                  <div>
                    <p className='mb-3 text-3xl font-bold text-violet-600'>اطلاعات بازار جهانی</p>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-bold text-gray-400'>حجم معاملات 24h</p>
                      <div className='mt-2 text-lg tracking-wider'>
                        <span className=' mr-1'>USD</span>
                        <span className='text-black font-bold tracking-wider'>
                          {convertToInternationalCurrencySystem(
                            getCryptoDataFromApiForHomePageTable[0] && Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-usdt`].volumeDst)
                          )}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className='font-bold text-gray-400'>کمترین قیمت دیروز</p>
                      <p className='text-lg mt-2 tracking-wider'>
                        <span className='txet-gray-500 mr-1'>USD</span>{" "}
                        <span className='text-black font-bold'>
                          {getCryptoDataFromApiForHomePageTable[0] &&
                            Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-usdt`].dayLow).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className='font-bold text-gray-400'>بالاترین قیمت دیروز</p>
                      <div className='mt-2 tracking-wider'>
                        <span className='text-lg mr-1'>USD</span>
                        <span className='text-black font-bold text-lg'>
                          {getCryptoDataFromApiForHomePageTable[0] &&
                            Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-usdt`].dayHigh).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col flex-[2_2_0%] bg-white py-12 px-16 rounded-md border border-neutral-200'>
                  <div>
                    <p className='mb-3 text-3xl font-bold text-violet-600 '>اطلاعات بازار نوبیتکس</p>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-bold text-gray-400'>حجم معاملات 24h</p>
                      <div className='mt-2 text-lg tracking-wider'>
                        <span className='mr-1'>IRT </span>
                        <span className='text-black font-bold tracking-wider'>
                          {convertToInternationalCurrencySystem(
                            getCryptoDataFromApiForHomePageTable[0] && Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].volumeDst)
                          )}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className='font-bold text-gray-400'>کمترین قیمت دیروز</p>
                      <p className='mt-2 text-lg tracking-wider'>
                        <span className=' mr-1'>IRT</span>
                        <span className='text-black font-bold'>
                          {getCryptoDataFromApiForHomePageTable[0] &&
                            Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].dayLow).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className='font-bold text-gray-400'>بالاترین قیمت دیروز</p>
                      <div className='mt-2 text-lg tracking-wider'>
                        <span className='mr-1'>IRT</span>
                        <span className='text-black font-bold'>
                          {getCryptoDataFromApiForHomePageTable[0] &&
                            Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].dayHigh).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End ==> Global market information ==> right div */}

              {/* Start ==> Buy and sell cryptocurrency ==> left div */}
              <div className='flex-col flex-1 px-4 py-10 mr-4 bg-white border rounded-md border-neutral-200'>
                {/* Buy and sell => btn */}
                <div>
                  <button className='w-1/2 p-3 text-xl text-white transition ease-in bg-teal-500 rounded-r hover:bg-teal-600'>خرید</button>
                  <button className='w-1/2 p-3 text-xl text-gray-400 bg-gray-200 rounded-l'>فروش</button>
                </div>

                {/* change cryptocurrency price => input */}
                <div>
                  <div className='mt-4'>
                    <p className='mb-2'>من می خواهم</p>
                    <div className='relative'>
                      <input
                        onChange={(e) => setStorePriceFromIRTInput(e.target.value)}
                        value={
                          storePriceFromIRTInput
                            ? storePriceFromIRTInput
                            : storePriceFromCryptoInput &&
                              (
                                Number(storePriceFromCryptoInput) * Number(cryptoDetailFromApi && cryptoDetailFromApi.market_data.current_price.usd)
                              ).toLocaleString()
                        }
                        type='text'
                        className='w-full p-4 border rounded outline-none text-neutral-400 border-neutral-400'
                      />
                      <div className='absolute top-0 left-0 flex items-center h-full p-1 border-r border-neutral-400'>
                        <img src='../../assets/images/ir.logo.svg' className='w-6' />
                        <span className='mr-2 text-gray-400'>تومان</span>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <p className='mb-2 text-base'>بپردازم تا معادل</p>
                    <div className='relative'>
                      <input
                        onChange={(e) => setStorePriceFromCryptoInput(e.target.value)}
                        value={
                          storePriceFromCryptoInput
                            ? storePriceFromCryptoInput
                            : storePriceFromIRTInput &&
                              (storePriceFromIRTInput / Number(getCryptoDataFromApiForHomePageTable[0][`${rlsId}-rls`].bestBuy)).toLocaleString()
                        }
                        type='text'
                        className='w-full p-4 border rounded outline-none text-neutral-400 border-neutral-400'
                      />
                      <div className='absolute top-0 left-0 flex items-center h-full p-2 border-r border-neutral-400'>
                        <img src={cryptoDetailFromApi && cryptoDetailFromApi.image.large} className='w-7' />
                        <span className='mr-2 text-gray-400'>{cryptoDetailFromApi && cryptoDetailFromApi.localization.ar}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* buy btn */}
                <button className='w-full p-3 mt-6 text-xl text-center text-white transition ease-in rounded bg-violet-500 hover:bg-violet-600'>
                  همین الان خرید کنم
                </button>
              </div>
              {/* End ==> Buy and sell cryptocurrency ==> left div */}
            </div>
            {/* End ==> second row */}
          </div>
          {/* End ==> First div */}

          {/* Start ==> Symbol chart */}
          <section
            className='bg-white h-[550px] w-full flex items-center
             justify-center rounded border border-gray-200 -mt-[14rem] mb-8'>
            <SymbolOverview
              widgetProps={{
                symbols: [`BINANCE:${rlsId}USDT|12M`],
                chartOnly: false,
                width: 900,
                height: 400,
                locale: "en",
                colorTheme: "light",
                autosize: true,
                showVolume: true,
                hideDateRanges: false,
                scalePosition: "no",
                gridLineColor: "rgba(152,0,255,0.2)",
                scaleMode: "Normal",
                fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
                noTimeScale: false,
                valuesTracking: "1",
                chartType: "area",
                lineWidth: 3,
                lineColor: "rgba(103, 58, 183, 1)",
                topColor: "rgba(179, 157, 219, 0.3)",
                bottomColor: "rgba(41, 98, 255, 0)",
                container_id: "tradingview_36d42",
              }}
            />
          </section>

          {/* End ==> Symbol chart */}

          {/* Start ==> Information about cryptocurrency*/}
          <main className='bg-white border rounded-md border-neutral-200 h-fit'>
            <div className='px-16 py-16'>
              <h1 className='mb-3 text-3xl font-bold text-violet-700'>بیت کوین چیست؟</h1>
              <p className='mb-4'>
                بیت کوین اولین و مهم ترین رمزارز در بازار ارزهای دیجیتال است. قیمت بیت کوین بر قیمت همه ارزهای دیجیتال تاثیر بسیار زیادی دارد.
              </p>
              <p className='leading-6 mb-9'>
                بیت‌کوین یک رمزارز یا ارز دیجیتال و در حقیقت یک سیستم پرداخت جهانی است که رفتاری مشابه با پول بی‌پشتوانه دارد. به‌عنوان توضیحی
                ساده‌تر، بیت کوین یک دارایی دیجیتالی است که مبنایی صفر و یک داشته و به‌صورت الکترونیکی تولید، ذخیره و منتقل می‌شود. حساب و کتاب
                تراکنش‌های بیت‌کوین در یک زنجیره به‌هم‌پیوسته اطلاعاتی به نام بلاک‌چین یا زنجیره‌بلوک نگهداری شده و تراکنش‌های شبکه در هر بلاک توسط
                ماینر‌ها لیست می‌شود. مهم‌ترین مسئله در مورد بیت‌کوین این است که این ارز دیجیتال محدودیت 21 میلیون واحدی دارد! به بیانی ساده‌تر یعنی
                بعد از استخراج 21 میلیون سکه، دیگر امکان استخراج بیت‌کوین وجود نداشته و به انتها می‌رسد. بیت کوین بسیاری از ویژگی‌های ارزهای فیزیکی را
                دارد، با این تفاوت که آنی و بدون مرز بین افراد قابل جابجایی است. ارز دیجیتال بیت کوین در بستر اینترنت به کمک رایانه‌های پیشرفته و با
                قدرت پردازش بسیار بالا، در نتیجه حل معادلات ریاضیاتی بسیار پیچیده استخراج می‌شود. برای مشاهده قیمت لحظه ای بیت کوین می توانید از
                نمودار بالا استفاده کنید.
              </p>
              <h1 className='mb-5 text-3xl font-bold text-violet-700'>فروش و خرید بیت کوین در نوبیتکس</h1>
              <h3 className='mb-5 font-bold'>1- ثبت‌نام و ایجاد حساب کاربری در نوبیتکس:</h3>
              <p className='my-5'>
                // در ابتدا برای ثبت‌نام اولیه شما تنها به یک آدرس ایمیل فعال نیاز خواهید داشت. توصیه می‌شود که برای ثبت‌نام در نوبیتکس از رمز عبور //
                غیرتکراری و قدرتمندی استفاده کنید تا امنیت اولیه حساب کاربری‌‌ شما تضمین شود.
              </p>
              <h3 className='my-5 font-bold'>2- تائید حساب کاربری:</h3>
              <p>
                پس از انجام ثبت‌نام اولیه، برای خرید ارز دیجیتال بیت کوین باید مراحل احراز هویت را انجام دهید. احراز هویت در نوبیتکس با توجه به کاربری
                مالی آن، با ثبت‌نام در شبکه‌های اجتماعی و یا نرم‌افزارهای کاربردی روزمره متفاوت است و نیازمند ارائه اطلاعات هویتی درست و دقت و توجه
                بالا در ارسال اطلاعات است. برای خرید بیت کوین یا رمز ارزهای دیگری همچون{" "}
                <span className='text-violet-600 hover:underline hover:cursor-pointer'>بیت کوین</span>،
                <span className='text-violet-600 hover:underline hover:cursor-pointer'>یونی سواپ</span> ،{" "}
                <span className='text-violet-600 hover:underline hover:cursor-pointer'>دای</span> و{" "}
                <span className='text-violet-600 hover:underline hover:cursor-pointer'>چین لینک</span>، آوه و دات … شما به احراز هویت نیاز خواهید
                داشت. بهترین کار ممکن این است که پیش از هر اقدامی در مورد{" "}
                <span className='text-violet-600 hover:underline hover:cursor-pointer'>رویه احراز هویت نوبیتکس</span> مطالعه کنید.
              </p>
              <h3 className='my-5 font-bold'>3- شارژ حساب ریالی یا رمزارز قابل تبدیل آن:</h3>
              <p>
                شما می‌توانید به کمک این راهنما،{" "}
                <span className='text-violet-600 hover:cursor-pointer hover:underline'>حساب کاربری خود را شارژ کنید</span>. خرید ارز دیجیتال بیت کوین
                در نوبیتکس با پول نقد یا به عبارتی ریال در بازار اصلی و با تتر در بازار حرفه‌ای، امکان‌پذیر است.
              </p>
              <h3 className='my-5 font-bold'>4- خرید بیت کوین:</h3>
              <p>
                خرید بیت کوین در نوبیتکس به‌صورت ارائه پیشنهاد خرید بیت کوین در این بازار همتا به همتا (P2P) انجام می‌شود. در واقع در این بازار شما
                ارز دیجیتال مورد نظر خود را از کاربران فعال در پلتفرم نوبیتکس خریداری می‌کنید. به همین دلیل تکمیل فرایند خرید شما به پذیرش معامله از
                سوی دیگر کاربران بستگی دارد.‌
              </p>
              <h1 className='mt-10 text-3xl font-bold text-violet-700'>خرید بیت کوین</h1>
              <p className='my-4'>
                خرید بیت کوین در نوبیتکس به دو صورت سفارش سریع و محدود امکان‌پذیر است. در سفارش سریع، خرید و فروش شما به‌صورت آنی با قیمت بازار صورت
                می‌گیرد اما در سفارش محدود شما می‌توانید مبلغ مورد نظر خود را وارد کنید. در این روش، معامله پس از اینکه کاربری دیگر با این قیمت بیت
                کوین حاضر به خرید یا فروش بود؛ صورت می‌گیرد.
              </p>
              <p className='mb-4'>
                با توجه به تعداد میلیونی کاربران نوبیتکس، شاخص نقد شوندگی این صرافی بسیار بالاست و بنابراین عمده خریدوفروش‌های ارزهای دیجیتال این
                صرافی در زمان بسیار کوتاهی انجام می‌شود. همچنین شکاف قیمتی بزرگی میان صرافی نوبیتکس و دیگر صرافی‌های بزرگ دنیا وجود ندارد.
              </p>
              <p>
                به‌منظور ایجاد یک سرمایه‌گذاری موفق در بازار نوبیتکس و خرید رمزارزهای مختلف از قبیل{" "}
                <span className='text-violet-600 hover:cursor-pointer hover:underline'>خرید تتر</span> یا ارز دیجیتال بیت کوین، توصیه می‌کنیم که
                همواره به چرخه‌های بازار توجه دقیق داشته باشید و هرگز بیش از توان مالی خود سرمایه‌گذاری نکنید.
              </p>
              <h1 className='mt-10 text-3xl font-bold text-violet-700'>فروش بیت کوین</h1>
              <p className='mt-5'>
                برای فروش بیت کوین نیز دو گزینه سفارش سریع و محدود وجود دارد. در سفارش محدود شما قیمت بیت کوین مورد نظر را تعیین می کنید اما در سفارش
                سریع سفارش بر اساس قیمت لحظه ای بیت کوین و با نوساناتی جزئی، صورت می گیرد.
              </p>
              <p className='mt-4'>
                شما می توانید پیش از خرید بیت کوین یا هر ارز دیگر با مراجعه به صفحه{" "}
                <span className='text-violet-600 hover:cursor-pointer hover:underline'>ماشین حساب ارز دیجیتال</span> نسبت به محاسبه و تبدیل ارزهای
                دیجیتال به یکدیگر اقدام کنید.{" "}
              </p>
              <h1 className='mt-10 text-3xl font-bold text-violet-700'>قیمت بیت کوین</h1>
              <p className='mt-5'>
                قیمت بیت کوین یکی از مهم ترین ابزار برای تفسیر بازار ارزهای دیجیتال است. حتی تریدرهایی که در بیت کوین سرمایه گذاری نکرده اند؛ برای
                بررسی جامع تر بازار قیمت لحظه ای بیت کوین را رصد می کنند. در طی این سال ها قیمت بیت کوین فراز و فرودهای بسیاری را تجربه کرده و سرمایه
                گذاران گاهی دلسرد و گاهی هیجان زده شده اند. شما می توانید برای مشاهده قیمت لحظه ای بیت کوین به نمودار بالا مراجعه کنید و یا با تغییر
                تنظیمات نمودار روند قیمت بیت کوین در طول زمان را رصد کنید.
              </p>
              <p className='mt-5 text-cyan-900'>نوبیتکس، مرجعی مطمئن برای خرید و فروش بیت کوین</p>
              <p>
                نوبیتکس به عنوان مطمئن ترین صرافی خرید بیت کوین، امکان خرید بیت کوین با کمترین کارمزد را فراهم کرده است. علاوه بر سایت، کاربران محترم
                می‌توانند از اپلیکیشن نوبیتکس به‌عنوان بهترین اپلیکیشن خرید و فروش بیت کوین استفاده کنند. برای شروع خرید و فروش بیت کوین همین حالا
                می‌توانید سفارش خود را در صرافی آنلاین نوبیتکس ثبت کنید.
              </p>
            </div>
          </main>
          {/* End ==> Information about cryptocurrency*/}
          {/* Start ==> Accordion section */}
          <section className='mt-8'>
            <div className='flex flex-col p-16 bg-white border rounded-md border-neutral-200 '>
              <div className='flex items-center mb-8'>
                <AiFillQuestionCircle className='text-5xl text-purple-300' />
                <h1 className='mr-2 text-2xl font-bold text-violet-600'>سوالات متداول</h1>
              </div>
              <ControlledAccordions />
            </div>
          </section>
          {/* Start ==> Accordion section */}
        </div>
        {/* End ==> container div */}
      </div>
    </section>
  );
}

export default CryptoDetail;
