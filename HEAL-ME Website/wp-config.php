<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'healme');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '1ResourceLaB');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'I9n76>/&In@pulEAq_>~~6&?Rc9APJG8+doYR1t.-7E((d9&V3}Sqzbnz3{*6RcH');
define('SECURE_AUTH_KEY',  'O2ZpfS0Zf`f[|OhG~jj/;&EHm%;T3^76yGSu,b}yu+2T+p*Xv;kLoW[68_$fXB&T');
define('LOGGED_IN_KEY',    't%#D3SJ1].C= RJ$Ry)hlyTuxsN>a%sAO0 VWZC7lJsxHq%E7|0W_?TTyA&!y!ZP');
define('NONCE_KEY',        'rG,nmI[$;,<AhKDRa6$jHLFCQVP4| H .vbx3D=q|7s*VL#qIsO)zB1DK}:?&oVi');
define('AUTH_SALT',        ';00i`i.FRbL{,QE=jj0isN<x YMOgJCSu~~Aq greJ|{R0 fWK0|,BoJx}f}tg]x');
define('SECURE_AUTH_SALT', '5(K7jWq9Xi1W4O+E#xTQ0K:2=tD(@kV?q2m;QqAvDgSCj-z^7K<F5PF^B$B`7-/=');
define('LOGGED_IN_SALT',   '3D1mjSmXja|RAlUTm9^O+p6{GE,RKb{q. @c=19vt8<R=C<.z!!sd4LJT@OWZsA/');
define('NONCE_SALT',       '$:@F7r=+e_aUM+%,64HY7p[Y*MWc&KD;}=79H~?*.CkXKQm!]Dm5Nv{O{&y]s../');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
