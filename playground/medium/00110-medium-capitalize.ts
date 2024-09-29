/*
  110 - Capitalize
  -------
  by Anthony Fu (@antfu) #보통 #template-literal

  ### 질문

  문자열의 첫 글자만 대문자로 바꾸고 나머지는 그대로 놔두는 `Capitalize<T>`를 구현하세요.

  예시:

  ```ts
  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
  ```

  > GitHub에서 보기: https://tsch.js.org/110/ko
*/

/* _____________ 여기에 코드 입력 _____________ */
type MyCapitalize<S extends string> = S extends `a${infer R}` ? `A${R}` :
  S extends `b${infer R}` ? `B${R}` :
    S extends `c${infer R}` ? `C${R}` :
      S extends `d${infer R}` ? `D${R}` :
        S extends `e${infer R}` ? `E${R}` :
          S extends `f${infer R}` ? `F${R}` :
            S extends `g${infer R}` ? `G${R}` :
              S extends `h${infer R}` ? `H${R}` :
                S extends `i${infer R}` ? `I${R}` :
                  S extends `j${infer R}` ? `J${R}` :
                    S extends `k${infer R}` ? `K${R}` :
                      S extends `l${infer R}` ? `L${R}` :
                        S extends `m${infer R}` ? `M${R}` :
                          S extends `n${infer R}` ? `N${R}` :
                            S extends `o${infer R}` ? `O${R}` :
                              S extends `p${infer R}` ? `P${R}` :
                                S extends `q${infer R}` ? `Q${R}` :
                                  S extends `r${infer R}` ? `R${R}` :
                                    S extends `s${infer R}` ? `S${R}` :
                                      S extends `t${infer R}` ? `T${R}` :
                                        S extends `u${infer R}` ? `U${R}` :
                                          S extends `v${infer R}` ? `V${R}` :
                                            S extends `w${infer R}` ? `W${R}` :
                                              S extends `x${infer R}` ? `X${R}` :
                                                S extends `y${infer R}` ? `Y${R}` :
                                                  S extends `z${infer R}` ? `Z${R}` : S

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/110/answer/ko
  > 정답 보기: https://tsch.js.org/110/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
