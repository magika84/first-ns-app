<script src="http://localhost:8098"></script>
<template>
  <Page>
    // Action bar
    <ActionBar class="action-bar">
      <GridLayout width="100%" columns="auto, *">
        <Label width="10%" 
          :text="'fa-bars' | fonticon"
          class="fa h3"
          @tap="$refs.drawer.nativeView.showDrawer()"
          col="0"
        />
        <Label width="90%" class="h3" text="Pilot Voice" col="1"/>
      </GridLayout>
    </ActionBar>

    // Drawer Contents

    
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent  backgroundColor="#ffffff">
        <Label class="drawer-header sidedrawer-header" text="Profile"/>
        <Label class="drawer-item sidedrawer-list-item" text="Home"/>
        <Label class="drawer-item sidedrawer-list-item" text="Settings"/>
        <Label class="drawer-item sidedrawer-list-item" text="Sign In"/>
      </StackLayout>

    // Main Content outside of the drawer

      <StackLayout ~mainContent >
        
        <DockLayout>



          // Add Navigation tabs
          
<TabView class="tab-view" androidTabsPosition="bottom">
  <TabViewItem class="fa h3" :title="'fa-plane' | fonticon">
        <StackLayout dock="top" height="90%" width="100%">
          <Image class="logo" src="~/assets/images/logo.png"></Image>
          <ListView class="fa list-group" for="item in items" @itemTap="onItemTap">
            <v-template>
              <StackLayout class="fa list-group-item">
                <Label textWrap="true" :text="item.line" class="list-group-item-heading"/>
                <Label text="Tap to Select" class="list-group-item-text"/>
              </StackLayout>
            </v-template>
          </ListView>

          // Add Play Icon

          <Label :text="'fa-commenting' | fonticon"  class="fa h1" textAlignment="center" @tap="onPlayTap"/>

        </StackLayout>
  </TabViewItem>
  <TabViewItem class="fa h3" :title="'fa-list' | fonticon" >
    <StackLayout orientation="vertical" width="100%" height="100%">

          <GridLayout columns="2*,*" rows="*" width="100%" height="10%">
            <!-- Configures the text field and ensures that pressing Return on the keyboard produces the same result as tapping the button. -->
            <TextField col="0" row="0" v-model="textFieldValue" hint="Enternew script..." editable="true" @returnPress="onButtonTap" /> 

            <Button col="1" row="0" class="btn btn-primary btn-rounded-sm" text="Add script" @tap="onButtonTap" />
          </GridLayout>

          <ListView class="list-group" for="todo in todos" @itemTap="onItemTap" style="height:75%">
            <v-template>
              <Label :text="todo.name" textWrap="true" class="list-group-item-heading h3"  />
            </v-template>
          </ListView>
        </StackLayout>
  </TabViewItem>
  <TabViewItem class="fa h3" :title="'fa-commenting-o' | fonticon" >
    <Label text="Content for Tab 3" />
  </TabViewItem>
</TabView>
         
        </DockLayout>
      </StackLayout>

    </RadSideDrawer>


  </Page>
</template>

<script>
export default {

  methods: {
    onButtonTap() {
      if (this.textFieldValue === "") return; // Prevents users from entering an empty string.
      console.log("New task added: " + this.textFieldValue + "."); // Logs the newly added task in the console for debugging.
      this.todos.unshift({ name: this.textFieldValue }); // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
      this.textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    },
    onItemTap: function(args) {
      console.log("Item with index: " + args.index + " tapped");
    },
    onPlayTap: function(args) {
      console.log("Play icon tapped!");
      alert("Play icon tapped! " );
    },
    homeTap() {},
    fourTap() {},
    pretextsTap() {
      console.log("pretexts tapped!");
      this.$navigateTo(PreTexts, {
          animated: false,
          clearHistory: true
      });
    },
    customTap(){
      console.log("custom tapped!");
      this.$navigateTo(CustomScript, {
          animated: false,
          clearHistory: true
      });
    },
  },
  data() {
    return {
      todos: [],
      textFieldValue: "",
      items: [
        {
          line: "Takeoff Script:"
        },
        {
          line: "Approaching Script:"
        },
        {
          line: "Landing Script:"
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
