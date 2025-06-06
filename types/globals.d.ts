/* it is a type declartion file
Add custom types to global scope.
*/

import { User } from "./types";



declare global{
    interface CustomJwtSessionClaims extends User {}
}

  