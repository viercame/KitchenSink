function xhr(_args) {
	var self = Ti.UI.createWindow(),
		
		// if we're mobile web, don't make the rows touch enabled
		isMobileWeb = Ti.Platform.osname == "mobileweb";
	
	// create table view data object
	var data = [	
		{title:'Error Callback', hasChild:true, test:'ui/common/platform/xhr_error'},
		{title:'Binary Data', hasChild:!isMobileWeb, test:'ui/common/platform/xhr_binarydata', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		{title:'XML Data', hasChild:!isMobileWeb, test:'ui/common/platform/xhr_xml', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		{title:'XML Properties', hasChild:!isMobileWeb, test:'ui/common/platform/xhr_properties', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		{title:'File Download', hasChild:!isMobileWeb, test:'ui/common/platform/xhr_filedownload', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		{title:'UTF-8 + GET/POST', hasChild:!isMobileWeb, test:'ui/common/platform/xhr_utf8', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		{title:'Cookies', hasChild:!isMobileWeb, test:'ui/common/platform/xhr_cookie', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		{title:'setTimeout', hasChild:true, test:'ui/common/platform/xhr_settimeout'}
	];
	
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		data.push({title:'File Upload', hasChild:true, test:'ui/handheld/ios/platform/xhr_fileupload'});
	}
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.test)
		{
			var ExampleWindow = require(e.rowData.test),
				win = new ExampleWindow();
			_args.containingTab.open(win,{animated:true});
		}
	});
	
	// add table view to the window
	self.add(tableview);
	
	return self;
};

module.exports = xhr;