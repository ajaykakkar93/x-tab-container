var active='',initload='',objlst=[];
define( [ "qlik",'./getMasterItems', "text!./style.css" ],
function ( qlik, getMasterItems ,css) {
   $("<style id='x-tab-container'>").html(css).appendTo("head");
   
	return {
	  initialProperties: {
                listItems: []
            },
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    settings: {
                        uses: "settings",
                        items: {
						 	
							customstyle: {
								type: "items",
								label: "custom",
								items: {
									layout: {
										type: "boolean",
										component: "switch",
										label: "Layout Type",
										ref: "changeview",
										options: [{
											value: true,
											label: "Normal View"
										}, {
											value: false,
											label: "Vertical View"
										}],
										defaultValue: true
									},
									tabcss: {
                                        type: "string",
                                        ref: "tabcss",
                                        label: "Tab Css",
                                        expression: "optional",
										defaultValue: "background-color: #f1f1f1;"
                                    },
									tabactive: {
                                        type: "string",
                                        ref: "tabactive",
                                        label: "Tab Active Css",
                                        expression: "optional",
										defaultValue: "background-color: #ccc; border-top: 2px solid #7eca41;"
                                    },
								}
							},
							
                            MyList: {
                                type: "array",
                                ref: "listItems",
                                label: "Tab Items",
                                itemTitleRef: "label",
                                allowAdd: true,
                                allowRemove: true,
                                addTranslation: "Add Tab",
                                items: {
                                    label: {
                                        type: "string",
                                        ref: "label",
                                        label: "Label",
                                        expression: "optional"
                                    },
                                    list: {
                                        type: "string",
                                        component: "dropdown",
                                        label: "Master Object",
                                        ref: "defaultMasterObject",
                                        options: function() {
                                            return getMasterItems().then(function(items) {
                                                return items;
                                            });
                                        }
                                    },
									condition: {
                                        type: "string",
                                        ref: "condition",
                                        label: "Condition (true/false)",
                                        expression: "optional",
										defaultValue: "='true'//=if(1<2,'true','false')"
                                    }



                                }
                            }
                        }
                    }
                }
            },
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element, layout) {
			//add your rendering code here
			
			$('.qv-object-x-tab-container .qv-object-header.thin').hide();
			
			var app = qlik.currApp(this),html='',tab='',tabcont='',label=[],mstrobj=[],condition=[];
			
			var randomnumber = Math.floor(Math.random()*100) + 1;
			
			$.each(layout.listItems, function(index, value) {
                    $.each(value, function(i, v) {
						
                        // console.log(i);
                        // console.log(v);
                        // console.log("---------"+i.cId);
                        
                        if (i == 'label') {
                            label.push(v);
                        }
                        if (i == 'defaultMasterObject') {
                            mstrobj.push(v);
                        }
						 if (i == 'condition') {
                            condition.push(v);
                        }
						
                    });
              });
			
			if(layout.changeview){
				
				tab+='<div class="tab" style="'+layout.tabcss+'">';

					$.each(label, function(i, v) {
						console.log(condition[i]);
						if(condition[i]=='true' || condition[i]=='True' || condition[i]=='TRUE'){
							tab+='<button class="tablinks" target-id="' + mstrobj[i] + '">' + v + '</button>';
							//initload=mstrobj[i];
							objlst.push(mstrobj[i]);
						}
					});
					
							tabcont+='<div id="cont_'+randomnumber+'" class="tabcontent" curr-id=""></div>';
					
					initload=objlst[0];

				tab+='</div>';

				html=tab+tabcont;

				$element.html(html);
				
				$(document).one('ready', function(){
						//app.getObject('cont_' + randomnumber, mstrobj[0]);
				
				});
			
				
				
				$('.tablinks').click(function(){
					//console.log($(this).attr('target-id'));
					var i, tabcontent, tablinks;
					tabcontent = document.getElementsByClassName("tabcontent");
					for (i = 0; i < tabcontent.length; i++) {
						tabcontent[i].style.display = "none";
					}
					tablinks = document.getElementsByClassName("tablinks");
					for (i = 0; i < tablinks.length; i++) {
						tablinks[i].className = tablinks[i].className.replace(" active", "");
						tablinks[i].className = tablinks[i].className.replace(" active_"+randomnumber, "");
					}
					$('#cont_' + randomnumber).css("display","block");
					$(this).addClass("active");
					$(this).addClass("active_"+randomnumber);
					
					//app.destroySessionObject($(this).attr('target-id'));
					app.getObject('cont_' + randomnumber, $(this).attr('target-id'));
					
					console.log($(this).attr('target-id'));
					
					active=$(this).attr('target-id');
					
				});
				
				
				if(active == '' || active == undefined){
					
					app.getObject('cont_' + randomnumber,initload);
					
				}else{
					app.getObject('cont_' + randomnumber,active);
					console.log(active);
				}
				
				

					// initial load 1 object and active class
					var init_tablinks = $(".tablinks").first();
					
					//init_tablinks.click();
				
			}
			
			
			else{
				
			
			
				tab+='<div class="vtab" style="'+layout.tabcss+'">';

					$.each(label, function(i, v) {
						console.log(condition[i]);
						if(condition[i]=='true' || condition[i]=='True' || condition[i]=='TRUE'){
							tab+='<button class="vtablinks" target-id="' + mstrobj[i] + '">' + v + '</button>';
							//initload=mstrobj[i];
							objlst.push(mstrobj[i]);
						}
					});
					
							tabcont+='<div id="cont_'+randomnumber+'" class="vtabcontent" curr-id=""></div>';
					
					initload=objlst[0];

				tab+='</div>';

				html=tab+tabcont;

				$element.html(html);
				
				$(document).one('ready', function(){
						//app.getObject('cont_' + randomnumber, mstrobj[0]);
				
				});
			
				
				
				$('.vtablinks').click(function(){
					//console.log($(this).attr('target-id'));
					var i, tabcontent, tablinks;
					tabcontent = document.getElementsByClassName("vtabcontent");
					for (i = 0; i < tabcontent.length; i++) {
						tabcontent[i].style.display = "none";
					}
					tablinks = document.getElementsByClassName("vtablinks");
					for (i = 0; i < tablinks.length; i++) {
						tablinks[i].className = tablinks[i].className.replace(" active", "");
						tablinks[i].className = tablinks[i].className.replace(" active_"+randomnumber, "");
					}
					$('#cont_' + randomnumber).css("display","block");
					$(this).addClass("active");
					$(this).addClass("active_"+randomnumber);
					
					//app.destroySessionObject($(this).attr('target-id'));
					app.getObject('cont_' + randomnumber, $(this).attr('target-id'));
					
					console.log($(this).attr('target-id'));
					
					active=$(this).attr('target-id');
					
				});
				
				
				if(active == '' || active == undefined){
					
					app.getObject('cont_' + randomnumber,initload);
					
				}else{
					app.getObject('cont_' + randomnumber,active);
					console.log(active);
				}
				
				

					// initial load 1 object and active class
					var init_tablinks = $(".vtablinks").first();
					
					//init_tablinks.click();
			
			
				
			}
			
			
			// change layout
			if($('#x-tab-container-active-'+randomnumber).length == 0){
				$("<style id='x-tab-container-active-'"+randomnumber+"> div.tab button.active_"+randomnumber+"{ "+layout.tabactive+" } div.vtab button.active_"+randomnumber+"{ "+layout.tabactive+" } </style>").appendTo("head");
			}else{
				$('#x-tab-container-active-'+randomnumber).remove();
				$("<style id='x-tab-container-active-'"+randomnumber+"> div.tab button.active_"+randomnumber+"{ "+layout.tabactive+" } div.vtab button.active_"+randomnumber+"{ "+layout.tabactive+" } </style>").appendTo("head");
			}
			 
			 
			//needed for export
			//return qlik.Promise.resolve();
		}
	};

} );

