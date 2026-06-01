<?php

/**
 * MRII Insights and Innovators Body
 */
add_shortcode( 'code_snippets_export_1', function () {
	ob_start();
	?>

	<!-- MRII App: Mount Point + Bundle -->
	<!-- Paste this in WPCode as an HTML Snippet, with a Shortcode delivery method -->
	<!-- Then drop the generated shortcode into the Elementor HTML widget on your podcast page -->
	
	<div id="root"></div>
	<script type="module" crossorigin src="/wp-content/uploads/mrii-insights-innovators-2026/Assets/index-C7JFDgvP.js"></script>

	<?php
	return ob_get_clean();
} );
