import { SignUp } from "@/app/api/appwrite";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { userSchema } from "@/lib/utils";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const SingUp = () => {
  // state
  const { setUser, setLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  // styles
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);

  const submitHandler = async () => {
    try {
      const validation = userSchema.safeParse(form);
      if (!validation.success) {
        const errors = validation.error.errors.map((err) => err.message);
        Alert.alert("Validation Error", errors.join("\n"));
        return;
      }

      setIsSubmit(true);
      const result = await SignUp({ ...form });
      setUser(result as unknown as Models.Document[]);
      setLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert(
        "Sign Up Error",
        error instanceof Error ? error.message : "Something went wrong"
      );
      setIsSubmit(false);
    } finally {
      setIsSubmit(false);
      setForm({ username: "", email: "", password: "" });
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className=" justify-center min-h-[85vh] px-4 my-6">
          <View className="w-full justify-center items-center  px-4">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-bold  text-semibold mt-10 font-psemibold">
              Log in to Aora
            </Text>
          </View>
          <FormField
            title="User name"
            placeholder="Enter your user name"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
            otherStyle="mt-7"
            inputMode="text"
            keyboardType="default"
            inputStyle={isUsernameFocus ? "border-1 border-secondary-100" : ""}
            onFocus={() => setIsUsernameFocus(!isUsernameFocus)}
            onBlur={() => setIsUsernameFocus(false)}
          />
          <FormField
            title="Email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            otherStyle="mt-7 "
            autoComplete="email"
            inputStyle={isEmailFocus ? "border-1 border-secondary-100" : ""}
            onFocus={() => setIsEmailFocus(!isEmailFocus)}
            onBlur={() => setIsEmailFocus(false)}
            inputMode="email"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="*********"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, password: text })}
            otherStyle="mt-7"
            keyboardType="visible-password"
            inputStyle={isPasswordFocus ? "border-1 border-secondary-100" : ""}
            onFocus={() => setIsPasswordFocus(!isPasswordFocus)}
            onBlur={() => setIsPasswordFocus(false)}
          />

          <CustomButton
            title="Sign Up"
            handlePress={() => {
              submitHandler();
            }}
            containerStyle="mt-7"
            isLoading={isSubmit}
          />

          <View className="flex-row justify-center  pt-5  gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/singIn"
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
