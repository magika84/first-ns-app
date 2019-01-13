<template>
  <Page >
    <ActionBar class="action-bar">
      <GridLayout width="100%" columns="auto, *">
        <Label
          :text="'fa-bars' | fonticon"
          class="fa"
          @tap="$refs.drawer.nativeView.showDrawer()"
          col="0"
        />
        <Label class="h1" text="Pilot Voice" col="1"/>
      </GridLayout>
    </ActionBar>
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <Label class="drawer-header sidedrawer-header" text="Profile"/>
        <Label class="drawer-item sidedrawer-list-item" text="Home"/>
        <Label class="drawer-item sidedrawer-list-item" text="Settings"/>
        <Label class="drawer-item sidedrawer-list-item" text="Sign In"/>
      </StackLayout>

      <StackLayout ~mainContent >
        
        <DockLayout>

        <StackLayout dock="top" height="90%" width="100%">
        <ListView class="list-group" for="item in items" @itemTap="onItemTap">
          <v-template>
            <StackLayout class="list-group-item">
              <Label textWrap="true" :text="item.line" class="list-group-item-heading"/>
              <Label text="Tap to Select" class="list-group-item-text"/>
            </StackLayout>
          </v-template>
        </ListView>

// Add Speak Icon

        <Label :text="'fa-commenting' | fonticon"  class="fa h1" textAlignment="center" @tap="onPlayTap"/>

// Add Navigation tabs
</StackLayout>
         <StackLayout dock="bottom" height="10%" style="border-color:#E4E4E4;border-width:1;background:#fff;">
                        <StackLayout orientation="horizontal">
                            <StackLayout class="navItem tab-view" @tap="homeTap()">
                                <Label text="" android:class="notificationAndroid"
                                    ios:class="notification" opacity="0" />
                                <Label :text="'fa-plane' | fonticon" android:style="font-size:23;margin-top:-15"
                                    ios:style="font-size:29;margin-top:-15"
                                    class="fa" />
                            </StackLayout>
                            <StackLayout class="navItem tab-view" @tap="pretextTap()">
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
import App from "./App";  // Home Page
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
    customTap() {},
    fourTap() {},
    homeTap() {
        this.$navigateTo(App, {
            animated: false,
            clearHistory: true
        });
    },
    pretextTap() {
      this.$navigateTo(PreTexts, {
          animated: false,
          clearHistory: true
      });
    },
  },
  data() {
    return {
      items: [
        {
          line: "Airport Name:"
        },
        {
          line: "Aircraft ID"
        },
        {
          line: "N reg"
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
</style>