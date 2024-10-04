/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #보통 #template-literal #union #tuple

  ### 질문

  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

  > GitHub에서 보기: https://tsch.js.org/3326/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type ElementParser<S extends unknown[]> = S extends [] ? never : S extends [infer E extends string, ...infer R extends string[]] ? `__${E}` | ElementParser<[...R]> : never
type ModifierParser<S extends unknown[]> = S extends [] ? never : S extends [infer M extends string, ...infer R extends string[]] ? `--${M}` | ModifierParser<[...R]> : never
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${ElementParser<E> extends never ? '' : ElementParser<E>}${ModifierParser<M> extends never ? '' : ModifierParser<M>}`

/**
 * 더 간결한 답안:
 *
 *  type BEM<B extends string, E extends string[],M extends string[]> = `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`
 */

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/3326/answer/ko
  > 정답 보기: https://tsch.js.org/3326/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
