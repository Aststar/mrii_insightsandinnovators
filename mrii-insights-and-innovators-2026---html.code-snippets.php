<?php

/**
 * MRII Insights and Innovators 2026 - HTML
 */
add_shortcode( 'code_snippets_export_2', function () {
	ob_start();
	?>

	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">

	<?php
	return ob_get_clean();
} );
