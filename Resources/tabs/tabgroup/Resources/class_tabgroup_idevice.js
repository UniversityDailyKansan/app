var Class_Tabgroup = function(o, pages, initialTab, name) {
	
	var that = this;
	this.tabgroup;
	this.name = name;
	this.bar;
	this.view;
	this.tabs = [];
	this.tabInfo;
	this.isSwitching = false;
	this.page;
	
	// create tab
	this.bar = Ti.UI.createView(o.bar);
	this.view;
	this.tabgroup = Ti.UI.createView(o.tabgroup);
		
	this.addTab = function(tab) {
		
		tab.image = tab.o.off;
		
		var btTab = Ti.UI.createImageView(tab);
		
		btTab.addEventListener('touchstart', function(e) {
				
//			Ti.API.log(e.x + ', ' +  e.y + ', ' + e.source + ', ' + e.type);	
//			Ti.API.log(e.source.o.name);
						
			that.setActive(e.source.o.name);
							
		});
		
		this.tabs.push(btTab);
	
	},
	
	this.setActive = function(aTab) {
	
//		Ti.API.log('count tabs: ' + this.tabs.length);
		this.tabInfo.prev = this.tabInfo.next;

		for (var tab in this.tabs) {
					
			if (this.tabs[tab].o.name == aTab) {
			
				this.tabInfo.next = tab;
			
			}
		
		}
			
		Ti.API.log('prev: ' + this.tabInfo.prev);
		Ti.API.log('next: ' + this.tabInfo.next);
				
		// remove previous tabcontent
		if (this.tabInfo.prev != null) {
		
			this.tabs[this.tabInfo.prev].image = this.tabs[this.tabInfo.prev].o.off;
			this.removeContent(this.tabs[this.tabInfo.prev].o.name);
		
		}
		
		// add next tabcontent
		if (this.tabInfo.next != null) {
		
			this.tabs[this.tabInfo.next].image = this.tabs[this.tabInfo.next].o.on;
			this.loadContent(this.tabs[this.tabInfo.next].o.name);
			
		}
			
	};

	
	this.removeContent = function(name) {
				
		this.view.hide();
		
		this.isSwitching = false;
		
	};
	
	this.loadContent = function(name) {
		
		this.isSwitching = true;
		
		this.view = Ti.UI.createWindow(o.content);
		this.view.url = name + '.js';
		this.view.o = o;
				
		Ti.API.log('tabview.url: ' + this.view.url);		

		this.view.open();
										
		this.isSwitching = false;
																
	};

	this.create = function() {
	
		for (var tab in this.tabs) {
		
			this.bar.add(this.tabs[tab]);
			
			if (this.tabs[tab].o.name == initialTab) {
			
				this.tabInfo = {
				
					prev: tab,
					next: null
				
				}
			
			}
		
		}
		
		this.setActive(initialTab);
		
		this.tabgroup.add(this.bar);
			
	};
		
};
