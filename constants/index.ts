import { Database } from "firebase/database";

export const main_url =
  "https://9a90-41-90-177-76.eu.ngrok.io/uaa/";

// export const currency = function (money: number, code: string) {
//   return new Intl.NumberFormat(undefined, {
//     style: "currency",
//     currency: code,
//     minimumFractionDigits: 2,
//     currencyDisplay: "code",
//   }).format(money);
// };

export const writeUserData = (
  db: Database,
  set: any,
  ref: any,
  jObject: string,
  Uname: string,
  objectUsed: any,
  getResponse?: (data: string) => void
) => {
  const response = set(ref(db, `${jObject}/${Uname}`), objectUsed)
    .then(function () {
      getResponse("data created");
    })
    .catch(function (error) {
      getResponse(`error => ${error}`);
    });

  console.log(response);
  return response;
};
