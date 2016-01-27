# uXess
### Generic authorization module for role-based handling of ui elements
---

1. [Introduction](#introduction)
1. [Install](#install)
1. [Usage](#usage)
1. [Minimal Working Example](#minimal-working-example)
1. [Development](#development)
1. [Contribution](#contribution)
1. [Changelog](#changelog)

## Introduction
The only dependencies are [AngularJS](https://github.com/angular/angular.js/) and the animation module **ngAnimate**.

Tested against v1.4.7 but other versions should work.

## Install
For installation use the [Node Package Manager](https://github.com/npm/npm):
```
$ npm install --save uxess
```

or clone the repository:
```
$ git clone https://github.com/felixheck/uXess
```

## Usage
### Integration
Include **uXess** and **ngAnimate** into your application:
``` html
<!DOCTYPE html>
<html ng-app="yourApp">
<head>
	...
</head>
<body>
	...

	<script src="../uxess.min.js"></script>
	<script src="../angular-animate.min.js"></script>
</body>
</html>
```

Declare a dependency on the **uXess** module:
``` js
angular.module('yourApp', [
	'uxs'
]);
```

### Set a new wildcard symbol
In the `config` block:
``` js
angular.module('sampleApp')
	.config(function(uxsWildcardHandlerProvider) {
		uxsWildcardHandlerProvider.setWildcard('?');
	});
```

After initialisation, for example in a controller:
``` js
angular.module('yourApp').controller('FooCtrl', function(uxsWildcardHandler) {
	this.init = function() {
		uxsWildcardHandler.setWildcard('?');
	};
});
```

### Set default authorization type
In the `config` block:
``` js
angular.module('sampleApp')
	.config(function(uxsAuthTypeHandlerProvider) {
		uxsAuthTypeHandlerProvider.setDefaultAuthType('all');
	});
```

After initialisation, for example in a controller:
``` js
angular.module('yourApp').controller('FooCtrl', function(uxsAuthTypeHandler) {
	this.init = function() {
		uxsAuthTypeHandler.setDefaultAuthType('all');
	};
});
```

### Set permits
Before AngularJS bootstrapping:
``` js
angular.element(document).ready(function() {
	$.get('api/v1/user', function(res) {
		angular.module('yourApp').config(function(uxsPermitHandlerProvider) {
			uxsPermitHandlerProvider.setPermits(res.permits);
		});

		angular.bootstrap(document, ['yourApp']);
  });
});

```

In the `run` block:
``` js
angular.module('yourApp')
	.run(function($http, uxsPermitHandler) {
		$http.get('/api/v1/user').then(function(res) {
	    uxsPermitHandler.setPermits(res.permits);
	  });
	});
```

After initialisation, for example in a controller:
``` js
angular.module('yourApp').controller('FooCtrl', function(uxsPermitHandler) {
	this.init = function() {
		uxsPermitHandler.setPermits('admin');
	};
});
```

### Directives
Make use of static permit and the default authorization type:
``` html
<button uxs-if="admin"></button>
```

Make use of static permits and the **none** authorization type:
``` html
<button uxs-if="admin, user" uxs-type="none"></button>
```

Make use of the scope and the **all** authorization type:
``` html
<button uxs-if="FooCtrl.permits" uxs-type="all"></button>
```

Make use of an expression and the **any** authorization type:
``` html
<button uxs-if="{{ FooCtrl.permits }}" uxs-type="any"></button>
```

Make use of the wildcard symbol, to check if user has any role:
``` html
<button uxs-if="*"></button>
```
##Public API
### uxsAccessHandler
#### uxsAccessHandler.isPermitted
``` js
/**
 * @description
 * Check if UI element is accessible for user
 *
 * @param {(Array.<?string> | string)} permits Permits to be searched for
 * @param {string} authType Required auth type
 * @returns {boolean} UI element is accessible
 */
```

#### uxsAccessHandler.hasPermits
``` js
/**
 * @description
 * Check if any permits are included in `data.permits`of `uxsPermitHandler`
 *
 * @returns {boolean} Any permit is set
 */
```

#### uxsAccessHandler.hasAllPermits
``` js
/**
 * @description
 * Check if all passed permits are included in `data.permits` of `uxsPermitHandler`
 *
 * @param {(Array.<?string> | string)} permits Permits to be searched for
 * @returns {boolean} All passed permits are set
 */
```

#### uxsAccessHandler.hasAnyPermits
``` js
/**
 * @description
 * Check if any of passed permits is included in `data.permits` of `uxsPermitHandler`
 *
 * @param {(Array.<?string> | string)} permits Permits to be searched for
 * @returns {boolean} Any of passed permits is set
 */
```

#### uxsAccessHandler.hasNonePermits
``` js
/**
 * @description
 * Check if none of passed permits is included in `data.permits` of `uxsPermitHandler`
 *
 * @param {(Array.<?string> | string)} permits Permits to be searched for
 * @returns {boolean} None of passed permits is set
 */
```

### uxsAuthTypeHandler
#### uxsAuthTypeHandler.setDefaultAuthType
``` js
/**
 * @description
 * Set `_data.defaultAuthType`
 *
 * @param {string} authType Auth type to be set
 */
```

#### uxsAuthTypeHandler.getDefaultAuthType
``` js
/**
 * @description
 * Set `_data.defaultAuthType`
 *
 * @returns {string} `_data.defaultAuthType`
 */
```

#### uxsAuthTypeHandler.isAuthType
``` js
/**
 * @description
 * Check if passed auth type is valid
 *
 * @param {string} authType Auth type to be checked
 * @returns {boolean} Auth type is valid
 */
```

#### uxsAuthTypeHandler.parseAuthType
``` js
/**
 * @description
 * Parse passed auth type
 *
 * @param {string} authType Auth type to be parsed
 * @returns {string} Parsed auth type
 */
```

### uxsPermitHandler
#### uxsPermitHandler.setPermits
``` js
/**
 * @description
 * Set `_data.permits`
 *
 * @fires `uxsPermitsChanged`
 *
 * @param {(Array.<?string> | string)} permits Permits to be set
 */
```

#### uxsPermitHandler.getPermits
``` js
/**
 * @description
 * Get `_data.permits`
 *
 * @returns {Array.<?string>} `_data.permits`
 */
```

#### uxsPermitHandler.parsePermits
``` js
/**
 * @description
 * Parse permits to list of trimmed and transformed ones
 *
 * @param {(Array.<?string> | string)} permits Permits to be parsed
 * @returns {Array.<?string>} List of permits
 */
```

### uxsWildcardHandler
#### uxsWildcardHandler.setWildcard
``` js
/**
 * @description
 * Set `_data.wildcard`
 *
 * @param {string} wildcard Wildcard to be set
 */
```

#### uxsWildcardHandler.getWildcard
``` js
/**
 * @description
 * Get `_data.wildcard`
 *
 * @returns {Array.<?string>} `_data.permits`
 */
```

#### uxsWildcardHandler.parseWildcard
``` js
/**
 * @description
 * Parse wildcard to string
 *
 * @param {string} wildcard Wildcard to be parsed
 * @returns {string} Parsed wildcard
 */
```


## Minimal Working Example
To run a demo or rather a minimal working example, use:
```
$ npm run sample
```

It is possible to set the permits by checking the checkboxes.

## Development
### Testing
To execute all unit tests, use:
```
$ npm test
```

To execute end-to-end tests, use:
```
$ npm run http
$ npm run selenium
$ npm run test:e2e
```

To open the coverage information of the unit tests, use:
```
$ npm run coverage
```

### Distributing
To build the distributional files, use:
```
$ npm run build
```

or make use of the file watcher:
```
$ npm start
```

## Contribution
Fork this repository and push in your ideas.

Do not forget to add corresponding tests.

## Changelog

## License
The MIT License

Copyright (c) 2016 Felix Heck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.