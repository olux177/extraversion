export const formsData = {				"fields":	[								{												"name":	"email",												"label":	"Email	Address",												"type":	"email"								},								{												"name":	"password",												"label":	"Password",												"type":	"password"								},								{												"name":	"password_2",												"label":	"Re-enter	Password",												"type":	"password"								},								{												"name":	"firstname",												"label":	"First	Name",												"type":	"text"								},								{												"name":	"lastname",												"label":	"Last	Name",												"type":	"text"								},								{												"name":	"age",												"label":	"Age",												"type":	"number_int"
},								{												"name":	"can_drive",												"label":	"Do	you	hold	a	valid	drivers	license?",												"type":	"radio",												"options":	[																"Yes",																"No"												]								}				],				"rules":	[								{												"type":	"valid",												"on":	"email",												"pattern":	"[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}",								},								{												"type":	"valid",												"on":	"email",												"required":	true								},								{												"type":	"valid",												"on":	"password",												"required":	true								},								{												"type":	"valid",												"from":	"password",												"on":	"password_2",												"match":	true								},								{												"type":	"show",												"from":	"age",												"on":	"can_drive",												"gte":	17								}				] }