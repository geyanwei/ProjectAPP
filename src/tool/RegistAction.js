let isPressed = false; // prevent short time[200ms] double click

let savedKey = null;

let prevGetStateForAction = null;

export let CustomActions = {
	PopToRoot: "PopToRoot",
	UpdateParams: "UpdateParams",
	BackSavedPage: "BackSavedPage"
}

module.exports = function(RouteStack) {
	prevGetStateForAction = RouteStack.router.getStateForAction;

	RouteStack.router.getStateForAction = (action, state) => {
		if (!isPressed || action.autoNavi == "true") {
			isPressed = true;
			setTimeout(() => {
				isPressed = false;
			}, 500);
			if (action.params && "__saveKey" in action.params) {
				let routes = state.routes;
				savedKey = routes[routes.length - 1].key;
			}
			if (state && action.type == CustomActions.PopToRoot) {
				if (state.index <= 0) {
					// Over-popping does not throw error. Instead, it will be no-op.
					return state;
				} else {
					const routes = state.routes.slice(0, 1);
					return {
						...state,
						routes,
						index: 0
					};
				}
			} else if (state && action.type == CustomActions.UpdateParams) {
				if (action.params) {
					const routes = state.routes.slice(0, -1);
					routes.push(action);
					return {
						...state,
						routes
					};
				}
				return state;
			} else if (state && action.type == CustomActions.BackSavedPage) {
				if (savedKey) {
					let routes = state.routes;
					let savedIndex = routes.findIndex((val, index) => {
						return val.key == savedKey;
					});
					savedKey = null; // reset savedKey to null to prevent cache
					if (savedIndex >= 0) {
						const newRoutes = routes.slice(0, savedIndex + 1);
						return {
							...state,
							routes: newRoutes,
							index: newRoutes.length - 1
						};
					}
				} else {
					// no savedKey to dispatch this fallback to normal back navigation
					action.type = "Navigation/BACK";
				}
			}
			return prevGetStateForAction(action, state);
		}
	};
};
