<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label :text="'fa-bars' | fonticon" class="fa h2" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
               <Label class="title h2" text="Pilot Voice"  col="1"/>
           </GridLayout>
        </ActionBar>
              <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Profile"/>

                <Label class="drawer-item" text="Home"/>
                <Label class="drawer-item" text="Settings"/>
                <Label class="drawer-item" text="Sign In"/>
            </StackLayout>

            <StackLayout ~mainContent>
           
                <ListView class="list-group" for="script in scripts" @itemTap="onItemTap">
            <v-template>
                <StackLayout  class="list-group-item">
                    <Label textWrap="true" :text="script.line" class="list-group-item-heading"  />
                    <Label text="Tap to Select" class="list-group-item-text"/>
                </StackLayout>
            </v-template>
                 </ListView>
            <Label  :text="'fa-play-circle-o' | fonticon" class="fa h1" @itemTap="onItemTap"/>
            </StackLayout>
         </RadSideDrawer>
    </Page>
</template>

<script>
  export default {
      methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
            }
        },
    data() {
      return {
          scripts: [{
                        line: "Airport Name:",
                        
                    },
                    {
                        line: "Aircraft ID",
                        
                    },
                    {
                        line: "N reg",
                       
                    },
                    {
                        line: "Action",
                       
                    }
                   
                ]

      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #153eaf;
       color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #153eaf;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
