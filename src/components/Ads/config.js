export const adsenseClient = 'ca-pub-4241986024094799';

// NOTE adx slot definitions by slot id
export const adxSlots = {
  'div-gpt-ad-1559573943906-0': ['/21762661285/stockchase.com_run-of-site-top_728x90', [728, 90]],
  'div-gpt-ad-1559574540467-0': ['/21762661285/stockchase.com_run-of-site-incontent_728x90', [728, 90]],
};

export const slots = {
  // slotName: [adsenseOrAdx, adSlotId]
  // Sizes:
  //   Leaderboard:  728x90
  //   SideSquare:   300x250
  //   InFeed:       728x90
  //   Links:        responsive
  //   MobileFooter: 300x50
  // Notes:
  //   - Make sure to have adx slot definitions in index.template.html before setting ads to adx

  // GLOBAL (DEFAULT) AD SLOTS
  Leaderboard: ['adx', 'div-gpt-ad-1559573943906-0'],
  SideSquare: ['adsense', '7415387688'],
  InFeed: ['adx', 'div-gpt-ad-1559574540467-0'],
  Link: ['adsense', '3572899802'],
  FooterLink: ['adsense', '8007723438'],
  // Uncomment to enable MobileFooter ad
  // MobileFooter: ['adx', 'div-gpt-ad-9004875-9'],

  // PAGE AD SLOT OVERRIDES (for all slots except MobileFooter)
  // HomeLeaderboard: ['adsense', '7608715995'],
  // HomeSideSquare: ['adsense', '7415387688'],
  // HomeInFeed: ['adsense', '5979276843'],
  // HomeLink: ['adsense', '3572899802'],
  // HomeFooterLink: ['adsense', '8007723438'],

  // OpinionsLeaderboard: ['adsense', '7608715995'],
  // OpinionsSideSquare: ['adsense', '7415387688'],
  // OpinionsInFeed: ['adsense', '5979276843'],
  // OpinionsLink: ['adsense', '3572899802'],
  // OpinionsFooterLink: ['adsense', '8007723438'],

  // CompaniesLeaderboard: ['adsense', '7608715995'],
  // CompaniesSideSquare: ['adsense', '7415387688'],
  // CompaniesInFeed: ['adsense', '5979276843'],
  // CompaniesLink: ['adsense', '3572899802'],
  // CompaniesFooterLink: ['adsense', '8007723438'],

  // CompanyLeaderboard: ['adsense', '7608715995'],
  // CompanySideSquare: ['adx', 'div-gpt-ad-9004875-1'],
  // CompanyInFeed: ['adsense', '5979276843'],
  // CompanyLink: ['adsense', '3572899802'],
  // CompanyFooterLink: ['adsense', '8007723438'],

  // ExpertsLeaderboard: ['adsense', '7608715995'],
  // ExpertsSideSquare: ['adsense', '7415387688'],
  // ExpertsInFeed: ['adsense', '5979276843'],
  // ExpertsLink: ['adsense', '3572899802'],
  // ExpertsFooterLink: ['adsense', '8007723438'],

  // ExpertLeaderboard: ['adsense', '7608715995'],
  // ExpertSideSquare: ['adsense', '7415387688'],
  // ExpertInFeed: ['adsense', '5979276843'],
  // ExpertLink: ['adsense', '3572899802'],
  // ExpertFooterLink: ['adsense', '8007723438'],
};
