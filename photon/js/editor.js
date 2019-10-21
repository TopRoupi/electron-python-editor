var editor = ace.edit("editor");
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setMode("ace/mode/python");

function RunNonCS(){
  $("#Link").replaceWith("<pre id=\"Link\" class=\"resultarea\">Working...</pre>");
  $("#Warning").replaceWith("<div id=\"Warning\"></div>");
  $("#Error").replaceWith("<div id=\"Error\"></div>");
  $("#Result").replaceWith("<pre id=\"Result\" class=\"resultarea\"></pre>");
  $("#Files").replaceWith("<pre id=\"Files\"></pre>");

  var to_compile = {
    "LanguageChoice": "24",
    "Program": editor.getValue(),
    "Input": "",
    "CompilerArgs" : ""
  };

  $.ajax ({
    url: "https://rextester.com/rundotnet/api",
    type: "POST",
    data: to_compile
  }).done(function(data) {
    $("#Link").replaceWith("<pre id=\"Link\" class=\"resultarea\"></pre>");
    if(data.Warnings != null){
      $("#Warning").replaceWith("<div id=\"Warning\"><pre style=\"color: Orange\" class=\"resultarea\">Warning(s):</pre><pre id=\"WarningSpan\" class=\"resultarea\"></pre></div>");
      $("#WarningSpan").text(data.Warnings.replace(/\r/g, ""));
    }
    if(data.Errors != null){
        $("#Error").replaceWith("<div id=\"Error\"><pre style=\"color: Red\" class=\"resultarea\">Error(s)"+', warning(s)'+":</pre><pre id=\"ErrorSpan\" class=\"resultarea\"></pre></div>");
        $("#ErrorSpan").text(data.Errors.replace(/\r/g, ""));
    }
    if(data.Result != null)
      $("#Result").text(data.Result.replace(/\r/g, ""));
  }).fail(function(data, err) {
    alert("fail " + JSON.stringify(data) + " " + JSON.stringify(err));
  });
}