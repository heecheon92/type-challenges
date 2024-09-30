/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #보통 #template-literal

  ### 질문

  `camelCase`나 `PascalCase`를 `kebab-case` 문자열로 수정하세요.

  `FooBarBaz` -> `foo-bar-baz`

  예시:

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > GitHub에서 보기: https://tsch.js.org/612/ko
*/

/* _____________ 여기에 코드 입력 _____________ */
type LowerFirstChar<S extends string> =
  S extends `A${infer R}` ? `a${R}` :
    S extends `B${infer R}` ? `b${R}` :
      S extends `C${infer R}` ? `c${R}` :
        S extends `D${infer R}` ? `d${R}` :
          S extends `E${infer R}` ? `e${R}` :
            S extends `F${infer R}` ? `f${R}` :
              S extends `G${infer R}` ? `g${R}` :
                S extends `H${infer R}` ? `h${R}` :
                  S extends `I${infer R}` ? `i${R}` :
                    S extends `J${infer R}` ? `j${R}` :
                      S extends `K${infer R}` ? `k${R}` :
                        S extends `L${infer R}` ? `l${R}` :
                          S extends `M${infer R}` ? `m${R}` :
                            S extends `N${infer R}` ? `n${R}` :
                              S extends `O${infer R}` ? `o${R}` :
                                S extends `P${infer R}` ? `p${R}` :
                                  S extends `Q${infer R}` ? `q${R}` :
                                    S extends `R${infer R}` ? `r${R}` :
                                      S extends `S${infer R}` ? `s${R}` :
                                        S extends `T${infer R}` ? `t${R}` :
                                          S extends `U${infer R}` ? `u${R}` :
                                            S extends `V${infer R}` ? `v${R}` :
                                              S extends `W${infer R}` ? `w${R}` :
                                                S extends `X${infer R}` ? `x${R}` :
                                                  S extends `Y${infer R}` ? `y${R}` :
                                                    S extends `Z${infer R}` ? `z${R}` : S
type KebabFirstChar<S extends string> =
  S extends `${infer H}A${infer R}` ? `${H}-a${KebabFirstChar<R>}` :
    S extends `${infer H}B${infer R}` ? `${H}-b${KebabFirstChar<R>}` :
      S extends `${infer H}C${infer R}` ? `${H}-c${KebabFirstChar<R>}` :
        S extends `${infer H}D${infer R}` ? `${H}-d${KebabFirstChar<R>}` :
          S extends `${infer H}E${infer R}` ? `${H}-e${KebabFirstChar<R>}` :
            S extends `${infer H}F${infer R}` ? `${H}-f${KebabFirstChar<R>}` :
              S extends `${infer H}G${infer R}` ? `${H}-g${KebabFirstChar<R>}` :
                S extends `${infer H}H${infer R}` ? `${H}-h${KebabFirstChar<R>}` :
                  S extends `${infer H}I${infer R}` ? `${H}-i${KebabFirstChar<R>}` :
                    S extends `${infer H}J${infer R}` ? `${H}-j${KebabFirstChar<R>}` :
                      S extends `${infer H}K${infer R}` ? `${H}-k${KebabFirstChar<R>}` :
                        S extends `${infer H}L${infer R}` ? `${H}-l${KebabFirstChar<R>}` :
                          S extends `${infer H}M${infer R}` ? `${H}-m${KebabFirstChar<R>}` :
                            S extends `${infer H}N${infer R}` ? `${H}-n${KebabFirstChar<R>}` :
                              S extends `${infer H}O${infer R}` ? `${H}-o${KebabFirstChar<R>}` :
                                S extends `${infer H}P${infer R}` ? `${H}-p${KebabFirstChar<R>}` :
                                  S extends `${infer H}Q${infer R}` ? `${H}-q${KebabFirstChar<R>}` :
                                    S extends `${infer H}R${infer R}` ? `${H}-r${KebabFirstChar<R>}` :
                                      S extends `${infer H}S${infer R}` ? `${H}-s${KebabFirstChar<R>}` :
                                        S extends `${infer H}T${infer R}` ? `${H}-t${KebabFirstChar<R>}` :
                                          S extends `${infer H}U${infer R}` ? `${H}-u${KebabFirstChar<R>}` :
                                            S extends `${infer H}V${infer R}` ? `${H}-v${KebabFirstChar<R>}` :
                                              S extends `${infer H}W${infer R}` ? `${H}-w${KebabFirstChar<R>}` :
                                                S extends `${infer H}X${infer R}` ? `${H}-x${KebabFirstChar<R>}` :
                                                  S extends `${infer H}Y${infer R}` ? `${H}-y${KebabFirstChar<R>}` :
                                                    S extends `${infer H}Z${infer R}` ? `${H}-z${KebabFirstChar<R>}` : S
type KebabCase<S extends string> = KebabFirstChar<LowerFirstChar<S>>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/612/answer/ko
  > 정답 보기: https://tsch.js.org/612/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
