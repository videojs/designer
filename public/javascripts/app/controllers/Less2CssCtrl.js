l2c.controller('Less2CssCtrl', [
    '$http'
  , '$scope'
  , 'Stor'
  , 'LessCompiler'
  , 'LessOptions'

  , function($http, $scope, Stor, LessCompiler, LessOptions) {
    // Start req for options
    var LessCache = new Stor('LessCache');

    // Set model
    LessOptions.request.then(setupOptions);

    function setupOptions() {
      var opts = $scope.opts = LessOptions.options;

      updateOptions(opts);
      loadLess();

      // Setup watchers
      $scope.$watch('lessInput', function(val) {
        LessCache.set(val);
        compileLess();
      });

      $scope.$watch('opts.selectedVersion', loadLess);
      $scope.$watch('opts', updateOptions, true);
    }


    // Set defaults
    // @todo Work this value getter into directive or JSON.
    // Boo on DOM query even if it's only initial
    $scope.lessInput = LessCache.get() || $('#less-input').val();
    $scope.cssOutput = '';
    $scope.loading = false;
    $scope.compileError = false;

    function updateOptions(opts) {
      LessCompiler.updateOptions(opts);
      compileLess();
    }

    // Private fns
    function loadLess() {
      $scope.loading = true;
      var loading = LessCompiler.loadLess();

      loading.done(function() {
        $scope.$apply(function() {
          LessCompiler.initLess();
          compileLess();
          $scope.loading = false;
        });
      });
    }

    function compileLess() {
      var compiledCSS = LessCompiler.compileLess($scope.lessInput);
      if (!LessCompiler.error) {
        $scope.cssOutput = autoprefixer.compile(compiledCSS);
      } else {
        $scope.cssOutput = compiledCSS;
      }
      $scope.compileError = LessCompiler.error;
      $scope.safeApply();

      // Video.js Additions
      // Update a style tag in the page with the CSS output
      document.getElementById('skin-styles').innerHTML = $scope.cssOutput;
    }
  }
]);
