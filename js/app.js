$(function(){

	var htmlSample = ['<h1 class="hello">Hello</h1>',
					  '<button class="btn">Click</button>',
					].join("\n");

	var cssSample = ['h1{',
					  '	font-family:Arial;',
					  '}',	
					].join("\n");

	var jsSample = ['$(function(){',
					'	var onclick = function(){$(".hello").append(" World")};',
					'	$(".btn").click(onclick);',
					'});'	
					].join("\n");

	var template = ['<html>',
						'<head>',
							'<style type="text/css"><%= cssContent %></style>',
						'</head>',
						'<body>',
							'<%= htmlContent %>',
						    '<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"></script>',
						    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>',
							'<script type="text/javascript">',
								'<%= javascriptContent %>',
							'</script>',
						'</body>',
					'</html>'].join("\n");

	var updateOutput = function(content) {
		var previewFrame = document.getElementById('preview');
		var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
		preview.open();
		preview.write(content);
		preview.close();
	};

	var options = 
	{
		lineWrapping: true,		
		lineNumbers: true,
		tabMode: 'indent',
		matchBrackets: true
	};


	var htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlCode'), $.extend(true,options,{mode: 'text/html'}));

	var cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), $.extend(true,options,{mode: 'text/css'}));

	var javascriptEditor = CodeMirror.fromTextArea(document.getElementById('jsCode'), $.extend(true,options,{mode: 'text/javascript'}));

	$("#sample").click(function(){
		htmlEditor.setValue(htmlSample);
		cssEditor.setValue(cssSample);
		javascriptEditor.setValue(jsSample);
		var content = _.template(template,{'htmlContent':htmlSample,'cssContent':cssSample,'javascriptContent':jsSample });
		updateOutput(content);
	});

	$("#run").click(function(){
		var htmlContent = htmlEditor.getValue();
		var cssContent = cssEditor.getValue();
		var javascriptContent = javascriptEditor.getValue();
		var content = _.template(template,{'htmlContent':htmlContent,'cssContent':cssContent,'javascriptContent':javascriptContent });
		updateOutput(content);
	});

});


