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

        <StackLayout dock="top" height="90%" width="100%">
          <Image class="logo" src="~/assets/images/logo.png"></Image>
          <ListView class="list-group" for="item in items" @itemTap="onItemTap">
            <v-template>
              <StackLayout class="list-group-item">
                <Label textWrap="true" :text="item.line" class="list-group-item-heading"/>
                <Label text="Tap to Select" class="list-group-item-text"/>
              </StackLayout>
            </v-template>
          </ListView>

          // Add Play Icon

          <Label :text="'fa-commenting' | fonticon"  class="fa h1" textAlignment="center" @tap="onPlayTap"/>

        </StackLayout>

          // Add Navigation tabs
          

         <StackLayout dock="bottom" height="10%" > 
    
                        <StackLayout orientation="horizontal" class="tab-view">
                            <StackLayout class="navItem tab-view" @tap="homeTap()">
                                <Label text="" android:class="notificationAndroid"
                                    ios:class="notification" opacity="0" />
                                <Label :text="'fa-plane' | fonticon" android:style="font-size:23;margin-top:-15"
                                    ios:style="font-size:29;margin-top:-15"
                                    class="fa" />
                            </StackLayout>
                            <StackLayout class="navItem tab-view" @tap="pretextsTap()">
                                <Label text="" android:class="notificationAndroid"
                                    ios:class="notification" opacity="0" />
                                <Label :text="'fa-list' | fonticon" :color="mainColor"
                                    android:style="font-size:25;margin-top:-15"
                                    ios:style="font-size:30;margin-top:-15"
                                    class="fa" />
                            </StackLayout>
                            <StackLayout class="navItem tab-view" @tap="customTap()">
                                <Label text="" android:class="notificationAndroid"
                                    ios:class="notification" opacity="0" />
                                <Label :text="'fa-commenting-o' | fonticon" :color="profileColor"
                                    android:style="font-size:25;margin-top:-15"
                                    ios:style="font-size:30;margin-top:-15"
                                    class="fa" />
                            </StackLayout>
                             <StackLayout class="navItem tab-view" @tap="fourTap()">
                                <Label text="" android:class="notificationAndroid"
                                    ios:class="notification" />
                                <Label :text="'fa-tasks' | fonticon" android:style="font-size:25;margin-top:-15"
                                    ios:style="font-size:30;margin-top:-15"
                                    class="fa" />
                            </StackLayout>                            
                        </StackLayout>
         </StackLayout> 
        </DockLayout>
      </StackLayout>

    </RadSideDrawer>


  </Page>
</template>

<script>
import CustomScript from "./CustomScript";
import PreTexts from "./PreTexts";


export default {

  methods: {
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
