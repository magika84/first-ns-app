<script src="http://localhost:8098"></script>
<template>
  <Page>// Action bar
    <ActionBar class="action-bar">
      <GridLayout width="100%" columns="auto, *">
        <Label
          width="10%"
          :text="'fa-bars' | fonticon"
          class="fa h3"
          @tap="$refs.drawer.nativeView.showDrawer()"
          col="0"
        />
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
            // First page
            <TabViewItem class="fa h3" :title="'fa-plane' | fonticon">
              <StackLayout dock="top" height="90%" width="100%">
                <Image class="logo" src="~/assets/images/logo.png"></Image>
                <ListView class="fa list-group" for="item in items" @itemTap="onHomeItemTap">
                  <v-template>
                    <StackLayout class="fa list-group-item">
                      <Label textWrap="true" :text="item.line" class="list-group-item-heading"/>
                      <Label text="Tap to Select" class="list-group-item-text"/>
                    </StackLayout>
                  </v-template>
                </ListView>// Add Play Icon
                <Label
                  :text="'fa-commenting' | fonticon"
                  class="fa h1"
                  textAlignment="center"
                  @tap="onPlayTap"
                />
              </StackLayout>
            </TabViewItem>
            // second page
            <TabViewItem class="fa h3" :title="'fa-list' | fonticon">
              <StackLayout orientation="vertical" width="100%" height="100%">
                <GridLayout columns="2*,*" rows="*" width="100%" height="10%">
                  <!-- Configures the text field and ensures that pressing Return on the keyboard produces the same result as tapping the button. -->
                  <TextField
                    col="0"
                    row="0"
                    v-model="textFieldValue"
                    hint="Enter new script..."
                    editable="true"
                    @returnPress="onButtonTap"
                  />
                  <Button
                    col="1"
                    row="0"
                    class="btn btn-primary btn-rounded-sm"
                    text="Add script"
                    @tap="onButtonTap"
                  />
                </GridLayout>

                <ListView class="list-group" for="script in scripts" style="height:75%" @itemTap="onPretextItemTap">
                  <v-template>
                    <Label :text="script.name" textWrap="true" class="list-group-item-heading h3"/>
                  </v-template>
                </ListView>
              </StackLayout>
            </TabViewItem>


            // third page - Custom page
            <TabViewItem class="fa h3" :title="'fa-commenting-o' | fonticon">
              <StackLayout dock="top" height="90%" width="100%">
              
                    <CardView class="cardStyle" elevation="40" radius="10">
                      <StackLayout class="cardContent"  > 
                        <Label textWrap="true" text="Airport Name:"/>
                        <TextField :text="SelectedAirportName" hint="Tap to Select" editable="false" @tap="onCustomItemTap"/>
                      </StackLayout>
                    </CardView>
                    <CardView class="cardStyle" elevation="40" radius="10">
                      <StackLayout class="cardContent"> 
                        <Label textWrap="true" text="Aircraft:"/>
                        <Label text="name"/>
                      </StackLayout>
                    </CardView>
                    <CardView class="cardStyle" elevation="40" radius="10">
                      <StackLayout class="cardContent"> 
                        <Label textWrap="true" text="Action:"/>
                        <Label text="name"/>
                      </StackLayout>
                    </CardView>
                
              </StackLayout>
            </TabViewItem>
          </TabView>
        </DockLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import AirportList from "./AirportList";

export default {
  components: { AirportList },
  props: ["SelectedAirportName"],
  methods: {
    save() {
      this.$store.dispatch("insert", this.input);
    },
    load() {
      //this.$store.dispatch("query");
      this.$store.dispatch("query").then(() => {
        this.airports = this.$store.getters.allAirports;
        console.log(this.airports);
      });
      console.log("Pressed load button");
    },
    clear() {
      this.input.faaID = "";
      this.input.airportName = "";
    },
     onButtonTap() {
      if (this.textFieldValue === "") return; // Prevents users from entering an empty string.
      console.log("New task added: " + this.textFieldValue + "."); // Logs the newly added task in the console for debugging.
      this.scripts.unshift({ name: this.textFieldValue }); // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
      this.textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }, 
    onHomeItemTap: function(args) {
      console.log("Item on home page with index: " + args.index + " tapped");
    },
    onPretextItemTap: function(args) {
      console.log("Item on pretext page with index: " + args.index + " tapped");
    },
    onCustomItemTap: function(args) {
      console.log("Item on custom page with index: " + args.index + " tapped");
      this.$navigateTo(AirportList);
     
    },
    onPlayTap: function(args) {
      console.log("Play icon tapped!");
      alert("Play icon tapped! ");
    },
    pretextsTap() {
      console.log("pretexts tapped!");
      this.$navigateTo(PreTexts, {
        animated: false,
        clearHistory: true
      });
    },
    customTap() {
      console.log("custom tapped!");
      this.$navigateTo(CustomScript, {
        animated: false,
        clearHistory: true
      });
    }
  },
  data() {
    return {
      airportlistpage: AirportList,
      input: {
        faaID: "",
        airportName: ""
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
      ],
      customPgItems: [
        {
          line: "Airport Name:"
        },
        {
          line: "Aircraft ID"
        },
        {
          line: "Action"
        }
      ]
    };
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
