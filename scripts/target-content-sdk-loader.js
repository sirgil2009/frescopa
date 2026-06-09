/*
 * Target Content SDK — removed from project (SITES-46282).
 *
 * The SDK is now provided by the shared AEM author clientlib:
 *   Repo:      OneAdobe/personalization (PR #416, SITES-41360)
 *   Clientlib: cq.personalization.target.offerManagement
 *   Component: /libs/cq/personalization/components/targetoffermanagement
 *
 * ─── GAPS IN CLIENTLIB PR #416 THAT MUST BE FIXED (SITES-46283) ────────────
 *
 * 1. CRITICAL — Loader loads wrong file:
 *    offerManagementSdkLoader.js currently does:
 *      script.src = (window.hlx?.codeBasePath || '') + '/scripts/target-content-sdk.js'
 *    This file no longer exists. The loader must reference the compiled
 *    clientlib SDK path instead.
 *
 * 2. Missing: resourceUrns in detect-activity-scopes response (SITES-43134)
 *    The clientlib SDK must return:
 *      { mboxScopes, selectorMatches, resourceUrns }
 *    where resourceUrns[] contains data-aue-resource URN values for matched
 *    elements — used by the UE extension to map Target scopes to UE components.
 *
 * 3. Missing: window.__TARGET_PROJECT_SDK_DISABLED__ check in clientlib loader
 *    The clientlib loader should set or respect this flag so two SDK instances
 *    never run simultaneously.
 *
 * ─── MESSAGE PROTOCOL the clientlib SDK must implement (unchanged) ──────────
 *
 *   Inbound  source: 'ue-wrapper'
 *   Outbound source: 'target-content-sdk'
 *   Fields:  { source, action, messageId, payload }
 *
 *   Handlers:
 *     ping
 *       → { pong: true, mode: 'edit' | 'preview' }
 *
 *     detect-activity-scopes
 *       payload: { selectors: string[] }
 *       → { mboxScopes: string[], selectorMatches: Record<string, boolean>,
 *           resourceUrns: string[] }
 *
 *     highlightElements
 *       payload: { selectors, labelsBySelector, audienceLabelsBySelector,
 *                  audienceLabel, highlightTheme }
 *       → { overlays: number, matchedElements: number }
 *
 *     clearHighlight
 *       → { cleared: true }
 *
 *   On init: posts { source: 'target-content-sdk', action: 'sdk-ready', mode }
 *   to window.parent so the UE extension wrapper knows the SDK is ready.
 */
