import { Database } from "firebase/database";

export const main_url =
  "https://courtpayment-3b15c-default-rtdb.firebaseio.com/";

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
  objectUsed: any
) => {
  let response = ""
  set(ref(db, `${jObject}/${Uname}`), objectUsed)
    .then(function () {
      response =  "data created";
    })
    .catch(function (error) {
      response = `error => ${error}`;
    });
    return response
};
