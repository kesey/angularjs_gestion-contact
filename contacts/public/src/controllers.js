angular.module('ContactsApp')
    .controller('ListController', function ($scope, Contact, $location){
        $scope.contacts = Contact.query();
        $scope.fields = ["firstName", "lastName"];

        $scope.sort = function (field){
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        $scope.sort.field = "firstName";
        $scope.sort.order = false;

        $scope.show = function (id){
            $location.url("/contact/" + id);
        }
    })
    .controller('NewController', function ($scope, Contact, $location){
        $scope.contact = new Contact({
            firstName: ['', 'text'],
            lastName: ['', 'text'],
            email: ['', 'email'],
            homePhone: ['', 'tel'],
            cellPhone: ['', 'tel'],
            birthday: ['', 'date'],
            website: ['', 'url'],
            address: ['', 'text']
        });

        $scope.save = function (){
            if($scope.newContact.$invalid){ // newContact c'est le name du formulaire dans new.html
                $scope.$broadcast('record:invalid'); // on envoie 'record:invalid' dans les scopes descendants
            } else {
                $scope.contact.$save(); // on sauvegarde l'objet contact
                $location.url('/contacts'); // on redirige vers la liste des contacts
            }
        };
    })
    .controller('SingleController', function ($scope, Contact, $location, $routeParams){
        $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10)});
        $scope.delete = function(){
            $scope.contact.$delete();
            $location.url('/contacts');
        }
    });