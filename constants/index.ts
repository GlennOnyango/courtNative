import { Database } from "firebase/database";

export const main_url = "http://192.168.0.11:9000/api/v1/uaa/";

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
