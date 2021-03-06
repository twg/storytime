import _ from "lodash";

const ActionHandler = {
  
  /*
   * "Gatekeeper" method for handlers to first ensure it's been defined and
   *  warn if it's not. context is the Store context to bind to the handler.
   */
  send(context, payload) {
    let actionName = payload.actionType;
    if(typeof ActionHandler[actionName] !== 'function') {
      throw new Error('No ActionHandler found for ' + actionName);
    }
    return ActionHandler[actionName].call(context, payload);
  },
  
  //
  // Action Handlers, bound to Store context ===================================
  //
  
  // LISTVIEW STATE
  
  setSelection(payload) {
    this.setPref('selection', payload.id);
  },
  
  // STORIES
  
  addStory(payload) {
    let args = _.pick(payload, 'project', 'name');
    if(!args.name) return false; // don't add, don't emitChange on store
    let added = this.save(args);
    this.setPref('selection', added[0].id);
  },
  
  deleteStory(payload) {
    this.remove(payload.storyId);
  },
  
  startTimer(payload) {
    this.start(payload.storyId);
    this.setPref('current', payload.storyId);
  },
  
  stopTimer(payload) {
    this.stop(payload.storyId);
    this.setPref('current', '');
  },
  
  offsetTimer(payload) {
    this.offsetOn(payload.storyId, payload.day, payload.msecs);
  },
  
  addSession(payload) {}
  
}

module.exports = ActionHandler;