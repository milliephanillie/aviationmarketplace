<!doctype html>
<html {!! get_language_attributes() !!}>
@include('partials.head')
<body @php body_class() @endphp>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PKVH6BJ"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<!-- /22595167374/flying1x1 -->
<div id='div-gpt-ad-1646236290829-0'>
    <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1646236290829-0'); });
    </script>
</div>

@include('marketplace.partials.navbar')

@yield('content')

@include('marketplace.partials.footer')

</body>
</html>
