import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/**
 * Biome is the primary linter and formatter (see `biome.json`). ESLint is kept
 * for one reason: the React Compiler's `react-hooks/*` rules have no equivalent
 * among Biome's 554 rules, and they are the highest-value rules in this repo.
 *
 * `react-hooks/set-state-in-effect` alone caught two real bugs on 2026-09-18
 * (P1-029 in `blog-list.tsx`, P1-030 in `hero-animation.tsx`), one of which was
 * a user-visible dead link. Measured on a 14-defect probe the same day: Biome
 * missed both that rule and `set-state-in-render`; everything else it flagged
 * overlapped with ESLint.
 *
 * Everything Biome already covers is switched off here so the two tools do not
 * double-report. Revisit if Biome ships React Compiler rules — then this file
 * and the `eslint*` dependencies can go.
 */
const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  {
    rules: {
      // --- covered by Biome, disabled here to avoid duplicate reports ---
      '@next/next/no-img-element': 'off',          // performance/noImgElement
      '@next/next/no-head-element': 'off',         // style/noHeadElement
      '@next/next/no-sync-scripts': 'off',         // performance/noSyncScripts
      '@next/next/google-font-display': 'off',     // suspicious/useGoogleFontDisplay
      '@next/next/google-font-preconnect': 'off',  // performance/useGoogleFontPreconnect
      '@next/next/inline-script-id': 'off',        // correctness/useInlineScriptId
      '@next/next/no-document-import-in-page': 'off',
      '@next/next/no-head-import-in-document': 'off',
      '@next/next/no-unwanted-polyfillio': 'off',
      '@next/next/no-async-client-component': 'off',
      '@next/next/no-before-interactive-script-outside-document': 'off',
      'react/jsx-key': 'off',                      // correctness/useJsxKeyInIterable
      'react/jsx-no-duplicate-props': 'off',       // suspicious/noDuplicateJsxProps
      'react/no-children-prop': 'off',             // correctness/noChildrenProp
      'react/no-danger-with-children': 'off',      // security/noDangerouslySetInnerHtmlWithChildren
      'react/jsx-no-comment-textnodes': 'off',     // suspicious/noCommentText
      'jsx-a11y/alt-text': 'off',                  // a11y/useAltText
      'jsx-a11y/aria-props': 'off',                // a11y/useValidAriaProps
      'jsx-a11y/aria-proptypes': 'off',            // a11y/useValidAriaValues
      'jsx-a11y/aria-unsupported-elements': 'off', // a11y/noAriaUnsupportedElements
      'jsx-a11y/role-has-required-aria-props': 'off',
      'jsx-a11y/role-supports-aria-props': 'off',
      'react-hooks/rules-of-hooks': 'off',         // correctness/useHookAtTopLevel
      'react-hooks/exhaustive-deps': 'off',        // correctness/useExhaustiveDependencies
    },
  },
]

export default config
