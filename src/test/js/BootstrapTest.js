$LAB.script("./src/main/js/Bootstrap.js").wait(function(){
	console.log("handle");
	module("module1", {
	  setup: function() { 
	  	console.log("hi");   
	  }
	});	
	test("test if lab is working",function(){
		expect(1)
		var bs = new Bootstrap();
		ok(bs,"bs exists");
	});
	asyncTest("class has native accesors FF,Chrome,or Opera",function(){
		expect(2)
		var bs = new Bootstrap();
		$.getScript("./src/main/js/Point.js", function(data,status){
			ok(Point,"Point exists");
			equals(Bootstrap.prototype.hasCustomAccessors,false,"hasCustomAccessors is false")
			start();
		});
	});
	asyncTest("class does not have native accesors in IE and Safari",function(){
		expect(1)
		$.getScript("./src/main/js/Point.js", function(data,status){
			ok(Point,"Point exists");
			start();
		});
	});
});



