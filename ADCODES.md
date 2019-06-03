# Ad codes

https://developers.google.com/doubleclick-gpt/common_implementation_mistakes

## Adsense codes:

```
Homepage Leaderboard:

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Homepage - Leaderboard (728x90) -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-4241986024094799"
     data-ad-slot="7608715995"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


Footer sidewide unit:

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- STOCKCHASE Footer Sitewide Link Unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4241986024094799"
     data-ad-slot="3572899802"
     data-ad-format="link"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>



Site wide link unit (I think this is the Sponsored Links):

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- STOCKCHASE Sidewide Link Unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4241986024094799"
     data-ad-slot="8007723438"
     data-ad-format="link"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


Subpage leaderboard:

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Subpages - Leaderboard (728x90) -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-4241986024094799"
     data-ad-slot="5979276843"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


Subpage medium rectangle:

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Subpage - Medium Rectangle (300x250) -->
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:250px"
     data-ad-client="ca-pub-4241986024094799"
     data-ad-slot="7415387688"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## Adx codes:

### Leaderboard:

```
Header & body:

<script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
<script>
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
</script>

<script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21762661285/stockchase.com_run-of-site-top_728x90', [728, 90], 'div-gpt-ad-1559573943906-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>

Ad unit body code:

<!-- /21762661285/stockchase.com_run-of-site-top_728x90 -->
<div id='div-gpt-ad-1559573943906-0' style='height:90px; width:728px;'>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1559573943906-0'); });
</script>
</div>
```

### in-content (inside tables) unit

```
Header & body:

<script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
<script>
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
</script>

<script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21762661285/stockchase.com_run-of-site-incontent_728x90', [728, 90], 'div-gpt-ad-1559574540467-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>

Ad unit body code:

<!-- /21762661285/stockchase.com_run-of-site-incontent_728x90 -->
<div id='div-gpt-ad-1559574540467-0' style='height:90px; width:728px;'>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1559574540467-0'); });
</script>
</div>
```

## OLD ADX CODES

```
//Adslot 0 declaration (used for homepage square ad)
googletag.defineSlot('/21762661285/stockchase.com_InPost_DesktopMobile_300x250_BTF', [300, 250], 'div-gpt-ad-1557498114578-0')
  .addService(googletag.pubads());
//Adslot 1 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_CompaniesSquare_300x250_ATF', [[300,250]], 'div-gpt-ad-9004875-1')
  .addService(googletag.pubads()));
//Adslot 2 declaration
gptadslots.push(googletag.defineSlot('/21762661285/DiscoverWideHorizontalTop_Desktop_728x90_ATF_Flex', [[728,90],'fluid'], 'div-gpt-ad-9004875-2')
  .addService(googletag.pubads()));
//Adslot 3 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_DiscoverWideHorizontalTop_Desktop_970x250_ATF_Flex', [[970,250],'fluid'], 'div-gpt-ad-9004875-3')
  .addService(googletag.pubads()));
//Adslot 4 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_ExpertsSquare_300x250_ATF', [[300,250]], 'div-gpt-ad-9004875-4')
  .addService(googletag.pubads()));
//Adslot 5 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_InPost_DesktopMobile_300x250_BTF', [[300,250]], 'div-gpt-ad-9004875-5')
  .addService(googletag.pubads()));
//Adslot 6 declaration
gptadslots.push(googletag.defineSlot('/21762661285/Sidebar_Desktop_300x600', [[300,600]], 'div-gpt-ad-9004875-6')
  .addService(googletag.pubads()));
//Adslot 7 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_SiteWideHorizontalMiddleTable_728x90_BTF_Flex', [[728,90],'fluid'], 'div-gpt-ad-9004875-7')
  .addService(googletag.pubads()));
//Adslot 8 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_SiteWideHorizontalTop_Desktop_728x90_ATF_Flex', [[728,90],'fluid'], 'div-gpt-ad-9004875-8')
  .addService(googletag.pubads()));
//Adslot 9 declaration
gptadslots.push(googletag.defineSlot('/21762661285/stockchase.com_StickyBottom_Mobile_300x50', [[300,50]], 'div-gpt-ad-9004875-9')
  .addService(googletag.pubads()));
```
