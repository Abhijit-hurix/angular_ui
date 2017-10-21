app.controller('testController', function($scope, $http) {

 $scope.skillList = [];
 $scope.showAdd = false;
 $scope.addSkills = {
  "id": "",
  "name": "",
  "status": null
 }

 var localData = localStorage.getItem('data');
 $scope.skillList.push(JSON.parse(localData));
 $http.get('https://rocky-dawn-19603.herokuapp.com/skills').then(function(res) {
    $scope.skillList = res.data; 
 });

 $scope.addSkill = function() {
  $scope.addSkills.id = $scope.skillList.length + 1;
  $scope.skillList.push($scope.addSkills)
  localStorage.setItem('data', JSON.stringify($scope.addSkills)),
  $scope.add($scope.addSkills.id);
 }
 $scope.add = function(index) {
  $http.post('https://rocky-dawn-19603.herokuapp.com/skills', { name: $scope.addSkills.name, status: $scope.addSkills.status })
    .then(function(res) {
      alert('Skill added successfully!');
    });
    $scope.addSkills = {}
  }
 $scope.changeSkill = function(obj) {
  var a = $scope.skillList.indexOf(obj);
  $scope.skillList[a] = {
   "id": obj._id,
   "name": obj.name,
   "status": obj.status
  }
  
   $scope.openEdit = false;
  localStorage.setItem('data', JSON.stringify(obj)),
  $scope.edit(a);

 }
 $scope.edit = function(index) {
    $scope.data = $scope.skillList[index];
    $http.put('https://rocky-dawn-19603.herokuapp.com/skills/'+ $scope.data.id , { name: $scope.data.name })
      .then(function(res) {
        alert('Skill updated Successfully');
      });
    $scope.openEdit = false;
  }
 $scope.changeStatus = function(obj,status){
  var a = $scope.skillList.indexOf(obj);
  $scope.status(a,status);
 }

 $scope.status = function(index, status){
    var id = $scope.skillList[index]._id; 
    $http.put('https://rocky-dawn-19603.herokuapp.com/skills/'+ id , { status: status })
      .then(function(res) {
        alert('This skill is ' + (status === 1 ? 'Approved' : 'Rejected'));
      });   
  }
})

