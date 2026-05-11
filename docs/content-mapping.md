# Guided Migration Matrix

## Phase 1: Core Corporate Pages
- Old: Home/About narrative -> New: `/`, `/about`
- Old: What We Do summary -> New: Home card grid + `/practice-areas`
- Old: Contact basics -> New: `/contact`

## Phase 2: Practice and Industry Detail
- Old: Tax & Regulatory Services -> New: `/practice-areas/tax-regulatory-services`
- Old: Corporate Finance Advisory Services -> New: `/practice-areas/corporate-finance-advisory-services`
- Add industry-specific pages under `/industry-solutions/[entry]`

## Phase 3: Team and Office Pages
- Old: Partner list/profile cards -> New: `/about/team` + `team_members`
- Old: Office/contact points -> New: `/contact/[city-slug]` + `locations`

## Phase 4: Insights Taxonomy
- Old: Publications or updates content -> New: `/insights` and `/insights/[slug]`
- Categorize using `insight_categories` and `insight_tags`

## Redirect Strategy
- `/contact-us-chennai` -> `/contact/chennai`
- `/contact-us-mumbai` -> `/contact/mumbai`
- `/tax-regulatory-services` -> `/practice-areas/tax-regulatory-services`
- `/corporate-finance-advisory-services` -> `/practice-areas/corporate-finance-advisory-services`
