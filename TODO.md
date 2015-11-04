Controller: ctrl
Filter: flt
Directive: drv
Templates: tpl
Service: srv

1) isAccessible -> isPermitted()
2) AccessHandler(PermitHandler) -> PermitHandler(AccessHandler)
3) PermitHandler/AccessHandler -> Factory
	 Set Types/Permits
4) evtl. $interpolate falls expressions notwendig

