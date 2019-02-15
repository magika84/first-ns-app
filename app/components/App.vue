<script src="http://192.168.1.176:8098"></script>
<template>
  <Page >// Action bar
    <ActionBar class="action-bar">
      <GridLayout width="100%" columns="auto, *">
        <Label width="10%" :text="'fa-bars' | fonticon" class="fa h3" @tap="$refs.drawer.nativeView.showDrawer()" col="0" />
        <Label width="90%" class="h3" text="Pilot Voice" col="1"/>
      </GridLayout>
    </ActionBar>// Drawer Contents
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <Label class="drawer-header sidedrawer-header" text="Profile"/>
        <Label class="drawer-item sidedrawer-list-item" text="Home"/>
        <Label class="drawer-item sidedrawer-list-item" text="Settings"/>
        <Label class="drawer-item sidedrawer-list-item" text="Sign In"/>
      </StackLayout>// Main Content outside of the drawer
      <StackLayout ~mainContent>
        <DockLayout>// Navigation tabs
          <TabView class="tab-view" androidTabsPosition="bottom">
            // First Tab page
            <TabViewItem class="fa h3" :title="'fa-plane' | fonticon">
              <StackLayout dock="top" height="90%" width="100%">
                <Image class="logo" src="~/assets/images/logo.png"></Image>
                <CardView class="cardStyle" elevation="40" radius="10">
                  <ListView for="item in items">
                  <v-template>
                    
                    <StackLayout class="cardContent">
                      <Label textWrap="true" :text="item.line" />
                      <Label text="Tap to Select" />
                    </StackLayout>
                   
                  </v-template>
                </ListView>
                 </CardView>
                // Add Play Icon
                
                <Label :text="'fa-commenting' | fonticon" class="h1"  textAlignment="center" @tap="onPlayTap" />
              </StackLayout>
            </TabViewItem>
            // second Tab page
            <TabViewItem class="fa h3" :title="'fa-list' | fonticon">
              <StackLayout orientation="vertical" width="100%" height="100%">
                <GridLayout columns="2*,*" rows="*" width="100%" height="10%">
                  <!-- Configures the text field and ensures that pressing Return on the keyboard produces the same result as tapping the button. -->
                  <TextField col="0" row="0" v-model="textFieldValue" hint="Enter new script..." editable="true" @returnPress="onButtonTap" />
                  <Button col="1" row="0" class="btn btn-primary btn-rounded-sm" text="Add script" @tap="onButtonTap" />
                </GridLayout>

                <ListView class="list-group" for="script in scripts" style="height:75%" @itemTap="onPretextItemTap">
                  <v-template>
                    <Label :text="script.name" textWrap="true" class="list-group-item-heading h3"/>
                  </v-template>
                </ListView>
              </StackLayout>
            </TabViewItem>


            // third page - Custom page
            <TabViewItem class="fa h3" :title="'fa-commenting-o' | fonticon" >
             <ScrollView orientation="vertical">
              <StackLayout orientation="vertical" width="100%" >    
                <GridLayout columns="*, 150" rows="auto, auto, auto, auto">
                        <CardView col="0" row="0" class="cardStyle" elevation="40" radius="10">
                          <StackLayout  class="cardContent"  > 
                            <Label  text="Airport Name:"/>
                            <TextField  :text="SelectedAirportName" hint="Tap to Select" editable="false" @tap="onCustomArprtTap"/>
                          </StackLayout>
                        </CardView>
                  
                    <CardView col="1" row="0"   class="cardStyle" elevation="40" radius="10">
                      <StackLayout  class="cardContent">
                        <Label text="Heading:"/>
                        <TextField :isEnabled="AirportSelected" :text="SelectedRunway" hint="Tap to Select" editable="false" @tap="onCustomHeadingTap" />
                      </StackLayout>
                    </CardView>

                    <CardView col="0" row="1" colSpan="2" class="cardStyle" elevation="40" radius="10">
                      <StackLayout class="cardContent"> 
                        <Label textWrap="true" text="Aircraft:"/>
                         <TextField :text="SelectedAircraftLine" hint="Tap to Select" editable="false" @tap="onCustomArcrftTap"/>
                      </StackLayout>
                    </CardView>
                
                
                    <CardView col="0" row="2" colSpan="2" class="cardStyle" elevation="40" radius="10">
                      <StackLayout class="cardContent"> 
                        <Label textWrap="true" text="Action:"/>
                        <TextField :text="SelectedPlaneAction.line" hint="Tap to Select" editable="false" @tap="onCustomPlaneActnTap"/>
                      </StackLayout>

                    </CardView>
                
                    <CardView col="0" row="3" colSpan="2" class="cardStyle" elevation="40" radius="10">
                      <StackLayout class="cardContent"> 
                        <Label textWrap="true" text="Script:"/>"
                        <Label/>
                        <Label textWrap="true" :text="CustomScriptLine"  editable="false" />
                        <Label/>
                        <Label :text="'fa-commenting' | fonticon" class="h1" textAlignment="center" @tap="onPlayTap" />
                      </StackLayout>
                    </CardView>           
                </GridLayout>
              </StackLayout>
             </ScrollView>
            </TabViewItem>
          </TabView>
        </DockLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import AirportList from "./AirportList";
import AircraftList from "./AircraftList";
import PlaneActionList from "./PlaneActionList";
import RunwayList from "./RunwayList";
import PhoneticLetters from "./phoneticTable.json";


export default {
   data() {
    return {

      AirportSelected: false,
      phoneticLetters: PhoneticLetters,
      IndvdlCharLine: "",
      SelectedAirport: {
        faaID: "",
        airportName: ""
      },
      SelectedAircraft: {
        aircraftnumber: "",
        aircraftName: ""
      },
      SelectedHeading: {
        faaID: "",
        runway: ""
      },
      SelectedPlaneAction: { 
        line: ""
      },
      scripts: [],
      textFieldValue: "",

      items: [
        {
          line: "Takeoff Script:"
        },
        {
          line: "Approaching Script:"
        }
      ]
    };
  },
  computed: {
    // Aircraft Name need to be before Aircraft Number for script purpose
    SelectedAircraftLine: function() {
      this.speakIndividual(this.SelectedAircraft.aircraftnumber);
      return this.SelectedAircraft.aircraftName + " " + this.SelectedAircraft.aircraftnumber;
      
    },
    SelectedAirportName: function(){
      console.log("Inside computed - SelectedAirport: " + this.SelectedAirport.airportName);
        return this.SelectedAirport.airportName;      
    },
    SelectedRunway: function() {
      return this.SelectedHeading.runway;
    },
    // Creating a script line
    CustomScriptLine: function() {
      
      return this.SelectedAirport.airportName + " Traffic, " + this.SelectedAircraft.aircraftName + " " + this.IndvdlCharLine + ", " + this.SelectedPlaneAction.line + " " + this.SelectedHeading.runway + ", " + this.SelectedAirport.airportName;
    }


  },
  methods: {
    letter2codeword: function(letter){

      //console.log("letter2codeword(letter) is: ",letter);
      for ( var i = 0; i < this.phoneticLetters.length; i++){
      //console.log(this.phoneticLetters[i].Letter);

        if (this.phoneticLetters[i].Letter === letter){
          return this.phoneticLetters[i].phoneticAlpha;
          break;
        }
      }


    },
    speakIndividual: function(inputtxt)
    { 
      var letters = /^[A-Za-z]+$/;
      var j;
      this.IndvdlCharLine = "";
      for( j = 0; j < inputtxt.length; j++){
        // is the character letter?
        if (letters.test(inputtxt[j])){
          if(j != 0){
            this.IndvdlCharLine += " " + this.letter2codeword(inputtxt[j]);
          }else{
            this.IndvdlCharLine += this.letter2codeword(inputtxt[j]);
          }
          
        }
        else{
          if(j != 0){
            this.IndvdlCharLine += " " + inputtxt[j];
          }else{
            this.IndvdlCharLine += inputtxt[j];
          }
        }
          
      //   console.log("This character is Number: " +inputtxt[j]);
      };
        console.log("IndvdlCharLine - ", this.IndvdlCharLine);

      },
    save() {
      this.$store.dispatch("insert", this.input);
    },

    onButtonTap() {
      if (this.textFieldValue === "") return; // Prevents users from entering an empty string.
      console.log("New task added: " + this.textFieldValue + "."); // Logs the newly added task in the console for debugging.
      this.scripts.unshift({ name: this.textFieldValue }); // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
      this.textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }, 
    onPretextItemTap: function(args) {
      console.log("Item on pretext page with index: " + args.index + " tapped");
    },
    onCustomArprtTap: function(args) {
      const newId = new Date().getTime();
      
      console.log(args);
      this.$showModal(AirportList, { props: { id : newId }, fullscreen: true }).then(data => {this.SelectedAirport = data; if(this.SelectedAirport.airportName != "") this.AirportSelected = true; });
      
    },
    onCustomHeadingTap: function(args) {
      const newId = new Date().getTime();
      
      console.log(args);

      this.$showModal(RunwayList, { props: { id : newId }, fullscreen: true }).then(data => {this.SelectedHeading = data; console.log("this.SelectedHeading: " + this.SelectedHeading);});
      
    },
    onCustomArcrftTap: function(args) {
      const newId = new Date().getTime();
      
      //console.log(args);
      
      this.$showModal(AircraftList, { props: { id : newId }, fullscreen: true }).then(data => this.SelectedAircraft = data);
      
    },
    onCustomPlaneActnTap: function(args) {
      const newId = new Date().getTime();

      this.$showModal(PlaneActionList, { props: { id : newId } }).then(data => this.SelectedPlaneAction = data);
      console.log("In onCustomPlaneActnTap method - after this.$showModal");
      
    },
    onPlayTap: function(args) {
        alert("you pressed play icon!");

    },
  }
 
};
</script>

<style scoped>
.title {
  text-align: left;
  padding-left: 16;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  font-size: 16;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}
</style>
