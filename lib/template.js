'use strict';

module.exports = props => `\
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>${props.title}</title>
${props.fonts || ''}
<script>/* PAGE NUMBERS */</script>
    <style type="text/css">
${props.style}
    </style>
  </head>
  <body>
    <div class="container">
${props.front}
      <div id="content">
${props.body}
      </div>
    </div>
    <script>
${props.script}
    </script>
  </body>
</html>
`;
