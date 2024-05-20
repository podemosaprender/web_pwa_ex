//SEE: https://github.com/petersalomonsen/wasm-git
const pass= 'github_pat_etc_etc';
const accessToken= pass;

const repo= `http://localhost:5000/podemosaprender/xw1.git`
self.repo= repo;

const repoAuth= repo.replace('http://','http://podemosaprender:'+pass+'@')
console.log({repoAuth})


XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
  this._open(method, url, async, user, password);
  //this.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  this.setRequestHeader('Authorization', `Basic TODO-base64enc_data`);
}

var Module = {
	locateFile: function(s) {
		return './' + s;
	}
};

importScripts('./lg2.js');

const lg = Module;

Module.onRuntimeInitialized = () => {
	console.log("READY");
	self.lg= lg;
	self.FS= FS;
	FS.mkdirTree('/working');
	FS.mount(OPFS, {}, '/working');
	FS.mkdirTree('/home/web_user');
	FS.writeFile('/home/web_user/.gitconfig', '[user]\n' +
		'name = Test User\n' +
		'email = test@example.com');
}

self.clone= () => {
	FS.chdir('/working');    
	// clone a local git repository and make some commits
	lg.callMain(['clone',repoAuth, 'testrepo']);

	FS.chdir('testrepo')
	console.log(FS.readdir('.'));

	lg.callMain(['config','user.name','podemosaprender'])
	lg.callMain(['config','user.password',pass])

}

self.edit= () => {
	FS.chdir('/working/testrepo')

	FS.writeFile('t0.md','Hola '+new Date())

	lg.callMain(['add','t0.md'])

	lg.callMain(['commit','-m','TRY: web '+new Date()])
}

self.push= () => {
	FS.chdir('/working/testrepo')
	let r= lg.callMain(['push'])
	console.log(r)
}
