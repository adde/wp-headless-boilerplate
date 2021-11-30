<!doctype html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <?php wp_head() ?>
    </head>
    <body <?php body_class(); ?>>
        <?php wp_body_open(); ?>
        <h1>Nothing to see here!</h1>
        <p><a href="/wp-admin">Back to the dashboard</a></p>
        <?php wp_footer() ?>
    </body>
</html>
